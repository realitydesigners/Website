"use client";
import { SanityImage } from "@/components/global/Images";
import { cairo, monomaniac } from "@/fonts";
import Link from "next/link";
import React from "react";

const HeadingBlock = ({ block }) => {
	const { className } = block;

	switch (className) {
		case "light": {
			if (block?._type !== "headingBlock") {
				return null;
			}

			let publicationDate = block.publicationDate;

			if (!publicationDate && block.block) {
				const blockWithDate = block.block.find(
					(blockItem) => blockItem.publicationDate,
				);
				if (blockWithDate) {
					publicationDate = blockWithDate.publicationDate;
				}
			}

			const formattedDate = publicationDate
				? new Date(publicationDate).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
				  })
				: "Date not available";

			return (
				<div className="w-full h-auto bg-gray-200 pt-20 lg:pt-32">
					<div className="w-full flex justify-center flex-wrap">
						<div className="w-11/12 flex items-center lg:hidden">
							<div className="flex w-full">
								<span
									className={`${monomaniac.className} text-black ml-2  uppercase w-auto text-xs font-mono tracking-widest`}
								>
									PUBLISHED ON {formattedDate}
								</span>
							</div>
							{block.tags && block.tags.length > 0 && (
								<div className="flex">
									{block.tags.map((tag, index) => (
										<span
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className={`${monomaniac.className} text-xs h-auto flex uppercase font-mono font-semibold bg-black items-center justify-center p-1 pl-2 pr-2  tracking-widest text-gray-200 mr-1`}
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
						{block.image && (
							<div className="w-full flex-wrap lg:w-1/2 p-4 flex">
								<div className="w-full h-full object-cover object-contain">
									<SanityImage
										image={block.image}
										width={1000}
										height={1000}
										priority={true}
										alt={`Cover Image for ${block.title}`}
										classesWrapper="h-full w-full rounded-[1em]"
									/>
								</div>
							</div>
						)}
						<div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
							<div className="w-full">
								<div className="w-full hidden items-center lg:flex mb-6">
									<div className="flex w-full">
										<span
											className={`${monomaniac.className}  text-black font-mono w-auto text-xs tracking-widest `}
										>
											PUBLISHED ON {formattedDate}
										</span>
									</div>
									{block.tags && block.tags.length > 0 && (
										<div className="flex">
											{block.tags.map((tag, index) => (
												<span
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													key={index}
													className={`${monomaniac.className} text-xs h-auto flex uppercase font-mono font-semibold p-1 pl-2 pr-2  bg-black items-center justify-center p-2 border tracking-wide text-gray-200 mr-1`}
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
								{block.heading && (
									<h1
										className={`${monomaniac.className} text-5xl text-black capitalize leading-tightest mb-4 lg:text-6xl `}
									>
										{block.heading}
									</h1>
								)}
								{block.subheading && (
									<p
										className={`${cairo.className}  w-full  text-2xl  text-black leading-7 tracking-wide `}
									>
										{block.subheading}
									</p>
								)}
								<div className="w-auto h-auto flex items-center pt-4">
									{block.team && (
										<Link
											href={`/team/${block.team.slug.current}`}
											className={`${monomaniac.className} `}
										>
											<div className="flex items-center p-2 w-full">
												{block.team?.image && (
													<div className="flex items-center">
														<SanityImage
															image={block.team.image}
															alt={`Team member image for ${block.team.name}`}
															width={100}
															height={100}
															priority={true}
															classesWrapper=" h-[50px] w-[50px] object-cover cover rounded-[2em] "
														/>
														{block.team.name && (
															<span className="ml-2 uppercase text-black tracking-wide text-sm">
																{block.team.name}
															</span>
														)}
													</div>
												)}
											</div>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		case "dark": {
			let publicationDate = block.publicationDate;

			if (!publicationDate && block.block) {
				const blockWithDate = block.block.find(
					(blockItem) => blockItem.publicationDate,
				);
				if (blockWithDate) {
					publicationDate = blockWithDate.publicationDate;
				}
			}

			const formattedDate = publicationDate
				? new Date(publicationDate).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
				  })
				: "Date not available";

			return (
				<div className="w-full h-auto bg-black pt-20 lg:pt-32">
					<div className="w-full flex justify-center flex-wrap">
						<div className="w-11/12 flex items-center lg:hidden">
							<div className="flex w-full">
								<span
									className={`${monomaniac.className} text-gray-200 ml-2  uppercase w-auto text-xs font-mono tracking-widest`}
								>
									PUBLISHED ON {formattedDate}
								</span>
							</div>
							{block.tags && block.tags.length > 0 && (
								<div className="flex">
									{block.tags.map((tag, index) => (
										<span
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className={`${monomaniac.className} text-xs h-auto flex uppercase font-mono font-semibold bg-gray-200 items-center justify-center p-1 pl-2 pr-2  tracking-widest text-black mr-1`}
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
						{block.heading && (
							<h1
								className={`${monomaniac.className} text-5xl md:text-7xl p-4  text-gray-200 leading-tightest  lg:hidden `}
							>
								{block.heading}
							</h1>
						)}
						{block.image && (
							<div className="w-full flex-wrap lg:w-1/2 p-4 flex">
								<div className="w-full h-full object-cover object-contain">
									<SanityImage
										image={block.image}
										width={1000}
										height={1000}
										priority={true}
										alt={`Cover Image for ${block.title}`}
										classesWrapper="h-full w-full rounded-[1em]"
									/>
								</div>
							</div>
						)}
						<div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
							<div className="w-full">
								<div className="w-full hidden items-center lg:flex mb-6">
									<div className="flex w-full">
										<span
											className={`${monomaniac.className}  text-gray-200 font-mono w-auto text-xs tracking-widest `}
										>
											PUBLISHED ON {formattedDate}
										</span>
									</div>
									{block.tags && block.tags.length > 0 && (
										<div className="flex">
											{block.tags.map((tag, index) => (
												<span
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													key={index}
													className={`${monomaniac.className} text-xs h-auto flex uppercase font-mono font-semibold p-1 pl-2 pr-2  bg-gray-200 items-center justify-center p-2 border tracking-wide text-black mr-1`}
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
								{block.heading && (
									<h1
										className={`${monomaniac.className} text-5xl capitalize text-gray-200 leading-tightest mb-4 hidden lg:flex lg:text-6xl `}
									>
										{block.heading}
									</h1>
								)}
								{block.subheading && (
									<p
										className={`${cairo.className}  w-full  text-2xl  text-gray-400 leading-7 tracking-wide `}
									>
										{block.subheading}
									</p>
								)}
								<div className="w-auto h-auto flex items-center pt-4">
									{block.team && (
										<Link
											href={`/team/${block.team.slug.current}`}
											className={`${monomaniac.className} `}
										>
											<div className="flex items-center p-2 w-full">
												{block.team?.image && (
													<div className="flex items-center">
														<SanityImage
															image={block.team.image}
															alt={`Team member image for ${block.team.name}`}
															width={100}
															height={100}
															priority={true}
															classesWrapper=" h-[50px] w-[50px] object-cover cover rounded-[2em] "
														/>
														{block.team.name && (
															<span className="ml-2 uppercase text-gray-200 tracking-wide text-sm">
																{block.team.name}
															</span>
														)}
													</div>
												)}
											</div>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
};

export default React.memo(HeadingBlock);
