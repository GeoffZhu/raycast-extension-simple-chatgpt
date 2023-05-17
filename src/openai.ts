import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai'
import { getPreferenceValues } from "@raycast/api";

const { OPENAI_API_KEY, OPENAI_ORG_KEY } = getPreferenceValues();

const configuration = new Configuration({
  organization: OPENAI_ORG_KEY,
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default function (content: string, code = false) {
  const messages: ChatCompletionRequestMessage[] = []

  if (code) {
    messages.push({
      role: 'system',
      content: `In this conversations, you can only output code, no explanation required, preferred language is javascript.`
    })
  }

  messages.push({
    role: 'user',
    content
  })

  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 512,
    temperature: 0.5,
  }).then(resp => {
    return resp.data.choices[0].message?.content
  })
}
