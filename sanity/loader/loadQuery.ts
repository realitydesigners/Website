import 'server-only';

import { draftMode } from 'next/headers';

import { client } from '@/sanity/lib/client';
import { homePageQuery, pagesBySlugQuery, projectBySlugQuery, settingsQuery, postsQuery, postsBySlugQuery, categoryQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { HomePagePayload, PagePayload, ProjectPayload, SettingsPayload, PostsPayload, CategoryPayload } from '@/types';

import { queryStore } from './createQueryStore';

const serverClient = client.withConfig({
   token,
   stega: {
      // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
      enabled: process.env.VERCEL_ENV !== 'production',
   },
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
   const { perspective = draftMode().isEnabled ? 'previewDrafts' : 'published' } = options;
   // Don't cache by default
   let cache: RequestCache = 'no-store';
   // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
   if (!usingCdn && Array.isArray(options.next?.tags)) {
      cache = 'force-cache';
   }
   return queryStore.loadQuery(query, params, {
      cache,
      ...options,
      perspective,
   });
}) satisfies typeof queryStore.loadQuery;

export function loadSettings() {
   return loadQuery<SettingsPayload>(settingsQuery, {}, { next: { tags: ['settings', 'home', 'page', 'project'] } });
}

export function loadHomePage() {
   return loadQuery<HomePagePayload | null>(homePageQuery, {}, { next: { tags: ['home', 'project'] } });
}

export function loadProject(slug: string) {
   return loadQuery<ProjectPayload | null>(projectBySlugQuery, { slug }, { next: { tags: [`project:${slug}`] } });
}

export function loadPage(slug: string) {
   return loadQuery<PagePayload | null>(pagesBySlugQuery, { slug }, { next: { tags: [`page:${slug}`] } });
}

export function loadPosts() {
   // The generic here should be an array of PostsPayload, not a single value or null
   return loadQuery<PostsPayload[]>(postsQuery, {}, { next: { tags: [`posts`] } });
}

export function loadPostsPage(slug: string) {
   return loadQuery<PostsPayload | null>(postsBySlugQuery, { slug }, { next: { tags: [`posts:${slug}`] } });
}

export function loadCategories() {
   return loadQuery<CategoryPayload[]>(categoryQuery, {}, { next: { tags: [`category`] } });
}
