import { Configuration, OpenAIApi } from 'openai'

type OpenAiInstance = {
  openai: OpenAIApi | null
}

const INSTANCE: OpenAiInstance = {
  openai: null,
}

export const setUpApiKey = (apiKey: string) => {
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  INSTANCE.openai = openai
}

export const getOpenAiResponse = async ({
  content,
}: {
  content: string
}): Promise<string | undefined> =>
  (
    await INSTANCE.openai?.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
    })
  )?.data?.choices?.[0]?.message?.content
