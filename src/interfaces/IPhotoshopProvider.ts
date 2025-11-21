export interface IPhotoshopProvider {
  removeBackground(base64: string, mimeType?: string): Promise<string>;
}
