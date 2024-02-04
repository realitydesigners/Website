import { Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const MainStation = () => {
	return (
		<>
			<mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[0, 0, 50]} rotation={[0, Math.PI, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[-50, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[50, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>

			<SciFiLab />

			<StationCircle position={[-50, 0, -50]} label="Station A" />
			<StationCircle position={[50, 0, -50]} label="Station B" />
			<StationCircle position={[-50, 0, 50]} label="Station C" />
			<StationCircle position={[50, 0, 50]} label="Station D" />
		</>
	);
};

const StationCircle = ({ position, label }) => {
	useFrame(() => {
		if (textRef.current) {
			textRef.current.lookAt(camera.position);
		}
	});

	const textRef = useRef(null);
	const { camera } = useThree();
	return (
		<>
			<mesh position={position} rotation={[0, 0, 0]}>
				<cylinderGeometry args={[20, 10, 10, 50]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<Text
				ref={textRef}
				position={[position[0], position[1] + 8, position[2]]}
				rotation={[0, 0, 0]}
				fontSize={2}
				font={"/Staatliches.ttf"}
				color="white"
				text={label}
			/>
		</>
	);
};

const SciFiLab = () => {
	const meshRef = useRef(null);
	const gltf = useLoader(GLTFLoader, "models/scifi.glb");

	return (
		<primitive
			ref={meshRef}
			object={gltf.scene}
			scale={[3, 3, 3]}
			position={[0, -100, 0]}
		/>
	);
};
