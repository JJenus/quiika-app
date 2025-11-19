// src/utils/apiKeyManager.ts
import { useApiKeyStore } from "../stores/useApiKeyStore";
import { ApiKeyCrypto } from "./apiKeyCrypto";

export const initializeApiKeyManager = async (): Promise<boolean> => {
	const {
		apiKey,
		isApiKeyValid,
		initializeKeyExchange,
		completeKeyExchange,
		clearApiKey,
	} = useApiKeyStore.getState();

	// If we have a valid API key, ensure it's set in the client
	if (apiKey && isApiKeyValid()) {
		console.log("Using existing valid API key");
		return true;
	}

	// Clear any expired/invalid key
	if (apiKey && !isApiKeyValid()) {
		console.log("Clearing expired API key");
		clearApiKey();
	}

	// Otherwise, generate a new one
	console.log("Generating new dynamic API key...");

	try {
		// Step 1: Initialize key exchange
		const initSuccess = await initializeKeyExchange();
		if (!initSuccess) {
			console.error("Failed to initialize API key exchange");
			return false;
		}

		// Step 2: Generate client key pair
		const { publicKey: clientPublicKey, privateKey: clientPrivateKey } =
			await ApiKeyCrypto.generateClientKeyPair();

		// Step 3: Complete key exchange
		const completeSuccess = await completeKeyExchange(
			clientPublicKey,
			clientPrivateKey
		);

		if (completeSuccess) {
			console.log("Dynamic API key generated successfully");
			return true;
		} else {
			console.error("Failed to complete API key exchange");
			return false;
		}
	} catch (error) {
		console.error("API key generation failed:", error);
		return false;
	}
};

// Utility to handle API key regeneration for new challenges
export const handleChallengeRefresh = async (
	newChallenge: string
): Promise<string | null> => {
	const { regenerateApiKey } = useApiKeyStore.getState();
	return await regenerateApiKey(newChallenge);
};

export const withApiKey = async <T>(fn: () => Promise<T>): Promise<T> => {
	const { clearApiKey } = useApiKeyStore.getState();

	try {
		await initializeApiKeyManager();
		return await fn();
	} finally {
		clearApiKey();
	}
};
