export interface IGeminiProvider {
  generateBackground(
    base64: string,
    scenario: string,
    mimeType?: string,
  ): Promise<string>;
}
