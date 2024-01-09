"use client";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";

import HologramCrystal from "./HologramCrystal";
import { getCategoryPositions } from "./Postions";

export const Category = (props) => {
	const {
		title,
		position,
		isHighlighted,
		onPointerOver,
		onPointerOut,
		onHover,
		onLeave,
		selectedCategory,
		rotationY,
	} = props;

	const isDimmed = selectedCategory && selectedCategory !== title;

	const handleHover = () => {
		if (onPointerOver) {
			onPointerOver(title, position);
		}
	};

	const handleRedirect = () => {
		const categoryRoute = `/library/${title.toLowerCase()}`;
		window.location.href = categoryRoute;
	};

	const textRef = useRef(null);
	const { camera } = useThree();

	useFrame(() => {
		if (textRef.current) {
			textRef.current.lookAt(camera.position);
		}
	});

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<group
			position={position}
			rotation={[0, rotationY, 0]}
			onPointerOver={onHover}
			onPointerOut={onLeave}
			onClick={handleRedirect}
		>
			<HologramCrystal
				className="main-crystal"
				position={[0, 0, 5]}
				scale={[5, 5, 5]}
				onPointerOver={handleHover}
				onPointerOut={onPointerOut}
				emissiveIntensity={isDimmed ? 0.5 : isHighlighted ? 1 : 0.6}
			/>
			<Text
				ref={textRef}
				position={[0, 0, -1]}
				color="#fff"
				fontSize={1.5}
				font="/Staatliches.ttf"
				anchorY="middle"
				maxWidth={5}
				lineHeight={0.9}
				textAlign="center"
			>
				{title}
			</Text>
		</group>
	);
};

export const LibraryCategories = (props) => {
	const { categories, highlightedCategory, onCategorySelect } = props;

	const positions = getCategoryPositions(categories.length);
	const [rotation, setRotation] = useState(0);
	const groupRef = useRef();

	useFrame(() => {
		if (groupRef.current) {
			groupRef.current.rotation.y += 0.001;
		}
	});

	return (
		<group ref={groupRef}>
			{categories.map((cat, index) => {
				const [x, y, z] = positions[index];
				const world = cat.title || "";
				const isHovered = world === highlightedCategory;
				const rotationY =
					-((Math.PI * 2 * index) / categories.length) + Math.PI / 2;
				const groupRotationY = rotationY + rotation;

				return (
					<Category
						key={world}
						title={world}
						position={[x, y, z]}
						isHighlighted={isHovered}
						onClick={onCategorySelect}
						onPointerOver={() => onCategorySelect(world, [x, y, z])}
						onPointerOut={() => {}}
						selectedCategory={highlightedCategory}
						rotationY={rotationY}
					/>
				);
			})}
		</group>
	);
};

export default React.memo(LibraryCategories);
