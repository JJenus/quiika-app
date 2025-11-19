// Complete Crypto utilities with proper base64 URL-safe encoding
// src/utils/apiKeyCrypto.ts
export class ApiKeyCrypto {
	private static async generateKeyPair(): Promise<CryptoKeyPair> {
		try {
			console.log("Generating ECDH key pair...");
			const keyPair = await window.crypto.subtle.generateKey(
				{
					name: "ECDH",
					namedCurve: "P-256",
				},
				true,
				["deriveKey", "deriveBits"]
			);
			console.log("Key pair generated successfully");
			return keyPair;
		} catch (error) {
			console.error("Failed to generate key pair:", error);
			throw error;
		}
	}

	private static async exportPublicKey(
		publicKey: CryptoKey
	): Promise<string> {
		try {
			console.log("Exporting public key...");
			const exported = await window.crypto.subtle.exportKey(
				"raw",
				publicKey
			);
			const exportedArray = new Uint8Array(exported);
			// Use URL-safe base64 encoding to match backend
			const base64Url = this.arrayBufferToBase64Url(exportedArray);
			console.log(
				"Public key exported successfully, length:",
				base64Url.length
			);
			return base64Url;
		} catch (error) {
			console.error("Failed to export public key:", error);
			throw error;
		}
	}

	public static async generateClientKeyPair(): Promise<{
		publicKey: string;
		privateKey: CryptoKey;
	}> {
		try {
			console.log("Generating client key pair...");
			const keyPair = await this.generateKeyPair();
			const publicKey = await this.exportPublicKey(keyPair.publicKey);

			console.log("Client key pair generated successfully");
			return {
				publicKey,
				privateKey: keyPair.privateKey,
			};
		} catch (error) {
			console.error("Failed to generate client key pair:", error);
			throw new Error(`Failed to generate client key pair: ${error}`);
		}
	}

	public static async deriveSharedSecret(
		privateKey: CryptoKey,
		serverPublicKey: string
	): Promise<ArrayBuffer> {
		try {
			console.log("Deriving shared secret...");
			console.log(
				"Server public key input length:",
				serverPublicKey.length
			);

			// Import server public key - handle URL-safe base64
			const serverKeyBytes = this.base64UrlToArrayBuffer(serverPublicKey);
			console.log(
				"Server public key decoded to bytes, length:",
				serverKeyBytes.length
			);

			// Convert to ArrayBuffer to ensure compatibility
			const serverKeyBuffer = serverKeyBytes.buffer.slice(
				serverKeyBytes.byteOffset,
				serverKeyBytes.byteOffset + serverKeyBytes.byteLength
			);

			const serverKey = await window.crypto.subtle.importKey(
				"raw",
				serverKeyBuffer,
				{ name: "ECDH", namedCurve: "P-256" },
				true,
				[]
			);
			console.log("Server public key imported successfully");

			// Derive shared secret
			console.log("Performing key agreement...");
			const sharedSecret = await window.crypto.subtle.deriveBits(
				{
					name: "ECDH",
					public: serverKey,
				},
				privateKey,
				256
			);

			console.log(
				"Shared secret derived successfully, length:",
				sharedSecret.byteLength
			);
			return sharedSecret;
		} catch (error) {
			console.error("Failed to derive shared secret:", error);
			console.error("Server public key that failed:", serverPublicKey);
			throw new Error(`Failed to derive shared secret: ${error}`);
		}
	}

	public static async generateApiKey(
		challenge: string,
		sharedSecret: ArrayBuffer
	): Promise<string> {
		try {
			console.log("Generating API key from challenge...");
			console.log("Challenge length:", challenge.length);
			console.log("Shared secret length:", sharedSecret.byteLength);

			// Import shared secret as HMAC key
			const key = await window.crypto.subtle.importKey(
				"raw",
				sharedSecret,
				{ name: "HMAC", hash: "SHA-256" },
				false,
				["sign"]
			);
			console.log("HMAC key imported successfully");

			// Generate API key using HMAC
			const signature = await window.crypto.subtle.sign(
				"HMAC",
				key,
				new TextEncoder().encode(challenge)
			);
			console.log(
				"HMAC signature generated, length:",
				signature.byteLength
			);

			// Convert to base64 URL-safe string
			const apiKey = this.arrayBufferToBase64Url(
				new Uint8Array(signature)
			);
			console.log(
				"API key generated successfully, length:",
				apiKey.length
			);

			return apiKey;
		} catch (error) {
			console.error("Failed to generate API key:", error);
			throw new Error(`Failed to generate API key: ${error}`);
		}
	}

	// Utility methods for base64 URL-safe encoding/decoding
	private static arrayBufferToBase64Url(
		buffer: ArrayBuffer | Uint8Array
	): string {
		const bytes = new Uint8Array(buffer);
		let binary = "";
		for (let i = 0; i < bytes.byteLength; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		const base64 = btoa(binary);
		// Convert to URL-safe base64 (no padding)
		return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	}

	private static base64UrlToArrayBuffer(base64Url: string): Uint8Array {
		console.log("Decoding base64Url string, length:", base64Url.length);

		// Convert URL-safe base64 to standard base64
		let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

		// Add padding if necessary
		const padding = base64.length % 4;
		if (padding !== 0) {
			base64 += "=".repeat(4 - padding);
		}

		console.log(
			"After conversion to standard base64, length:",
			base64.length
		);

		try {
			const binary = atob(base64);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) {
				bytes[i] = binary.charCodeAt(i);
			}
			console.log(
				"Successfully decoded to array buffer, length:",
				bytes.length
			);
			return bytes;
		} catch (error) {
			console.error("Failed to decode base64:", error);
			console.error("Input base64Url:", base64Url);
			console.error("After conversion:", base64);
			throw error;
		}
	}

	// Add validation method to test the encoding/decoding
	public static async testKeyEncoding(
		serverPublicKey: string
	): Promise<boolean> {
		try {
			console.log("Testing server public key encoding...");
			const decoded = this.base64UrlToArrayBuffer(serverPublicKey);
			console.log(
				"Server public key decoded successfully, length:",
				decoded.length
			);

			// Convert to ArrayBuffer to ensure compatibility
			const keyBuffer = decoded.buffer.slice(
				decoded.byteOffset,
				decoded.byteOffset + decoded.byteLength
			);

			// Try to import the key to verify it's valid
			await window.crypto.subtle.importKey(
				"raw",
				keyBuffer,
				{ name: "ECDH", namedCurve: "P-256" },
				true,
				[]
			);

			console.log("Server public key is valid ECDH key");
			return true;
		} catch (error) {
			console.error("Server public key validation failed:", error);
			console.error("Server public key that failed:", serverPublicKey);
			return false;
		}
	}

	// Utility to check if Web Crypto API is available
	public static isWebCryptoSupported(): boolean {
		return !!(window.crypto && window.crypto.subtle);
	}

	// Utility to get crypto algorithm support info
	public static async getCryptoSupport(): Promise<{
		ecdh: boolean;
		hmac: boolean;
		base64: boolean;
	}> {
		const support = {
			ecdh: false,
			hmac: false,
			base64: false,
		};

		try {
			// Test ECDH support
			await window.crypto.subtle.generateKey(
				{ name: "ECDH", namedCurve: "P-256" },
				false,
				["deriveBits"]
			);
			support.ecdh = true;
		} catch (e) {
			console.warn("ECDH not supported:", e);
		}

		try {
			// Test HMAC support
			await window.crypto.subtle.generateKey(
				{ name: "HMAC", hash: "SHA-256" },
				false,
				["sign"]
			);
			support.hmac = true;
		} catch (e) {
			console.warn("HMAC not supported:", e);
		}

		// Test base64 support
		try {
			atob("test");
			btoa("test");
			support.base64 = true;
		} catch (e) {
			console.warn("Base64 not supported:", e);
		}

		return support;
	}
}