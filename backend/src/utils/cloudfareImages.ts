
export async function uploadImageToCloudflare(file: Express.Multer.File) {
  
  console.log("upload helper called:", file.originalname, file.size, file.mimetype)
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    throw new Error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN")
  }

  const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype })
  const formData = new FormData()
  formData.append("file", blob, file.originalname)

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiToken}` },
      body: formData,
    }
  )

  const rawText = await response.text();
if (!response.ok) {
  console.error("Cloudflare HTTP Status:", response.status);
  console.error("Cloudflare Raw Response:", rawText.slice(0, 500));
  throw new Error(`Cloudflare HTTP ${response.status}`);
}
const data = JSON.parse(rawText);
console.log("Account ID:", JSON.stringify(accountId))
console.log(data)
  return {
    id: data.result.id as string,
    url: data.result.variants[0] as string,
  }
}