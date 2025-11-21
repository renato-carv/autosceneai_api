export interface IS3Provider {
  uploadBase64(
    base64: string,
    folder?: string,
    extension?: string,
  ): Promise<string>;
}
