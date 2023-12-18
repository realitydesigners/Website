import { PostsList } from "@/components/global/PostsList";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export default async function PostPage() {
	// const response = await loadPosts();

	const post: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	console.log(post);

	return (
		<>
			<PostsList post={post} />
		</>
	);
}
