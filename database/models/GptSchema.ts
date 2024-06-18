import {ChatCompletionMessage} from "openai/resources";

export enum GptRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
  TOOL = 'tool',
}

export interface GptSchema {
  response_id: number;
  user_id: number;
  role: GptRole;
  content: string;
  created_at: string
}

// export type requestGptData = Omit<GptSchema, "response_id">
//
// type TextContent = {
//   type: 'text';
//   text: string;
// };
//
// type ImageContentPart = {
//   type: 'image_url';
//   image_url: {
//     url: string; // URL or base64 encoded image data
//     detail?: string; // Optional, defaults to 'auto'
//   };
// };
//
// type ContentPart = TextContent | ImageContentPart;
//

export type Message = {
  role: GptRole;
  // ContentParts are only for the 'user' role:
  content: string;
  // If "name" is included, it will be prepended like this
  // for non-OpenAI models: `{name}: {content}`
  name?: string;
};
//
// type FunctionDescription = {
//   description?: string;
//   name: string;
//   parameters: object; // JSON Schema object
// };
//
// type Tool = {
//   type: 'function';
//   function: FunctionDescription;
// };
//
// type ToolChoice =
//   | 'none'
//   | 'auto'
//   | {
//   type: 'function';
//   function: {
//     name: string;
//   };
// };
//
//
// export type OpenRouterRequest = {
//   // Either "messages" or "prompt" is required
//   messages?: Message[];
//   prompt?: string;
//
//   // If "model" is unspecified, uses the user's default
//   model?: string; // See "Supported Models" section
//
//   // Allows to force the model to produce specific output format.
//   // Only supported by OpenAI models, Nitro models, and some others - check the
//   // providers on the model page on openrouter.ai/models to see if it's supported,
//   // and set `require_parameters` to true in your Provider Preferences. See
//   // openrouter.ai/docs#provider-routing
//   response_format?: { type: 'json_object' };
//
//   stop?: string | string[];
//   stream?: boolean; // Enable streaming
//
//   // See LLM Parameters (openrouter.ai/docs#parameters)
//   max_tokens?: number; // Range: [1, context_length)
//   temperature?: number; // Range: [0, 2]
//   top_p?: number; // Range: (0, 1]
//   top_k?: number; // Range: [1, Infinity) Not available for OpenAI models
//   frequency_penalty?: number; // Range: [-2, 2]
//   presence_penalty?: number; // Range: [-2, 2]
//   repetition_penalty?: number; // Range: (0, 2]
//   seed?: number; // OpenAI only
//
//   // Function-calling
//   // Only natively suported by OpenAI models. For others, we submit
//   // a YAML-formatted string with these tools at the end of the prompt.
//   tools?: Tool[];
//   tool_choice?: ToolChoice;
//
//   // Additional optional parameters
//   logit_bias?: { [key: number]: number };
//
//   // OpenRouter-only parameters
//   // See "Prompt Transforms" section: openrouter.ai/docs#transforms
//   transforms?: string[];
//   // See "Model Routing" section: openrouter.ai/docs#model-routing
//   models?: string[];
//   route?: 'fallback';
//   // See "Provider Routing" section: openrouter.ai/docs#provider-routing
//   provider?: any;
// };
//


export type Error = {
  code: number; // See "Error Handling" section
  message: string;
};

export type FunctionCall = {
  name: string;
  arguments: string; // JSON format arguments
};

export type ToolCall = {
  id: string;
  type: 'function';
  function: FunctionCall;
};


export type ResponseMessage = {
  content: string | null;
  role: GptRole;
  tool_calls?: ToolCall[];
  // Deprecated, replaced by tool_calls
  function_call?: FunctionCall;
};



// Open Router response types
export type OpenRouterResponse = {
  id: string;
  // Depending on whether you set "stream" to "true" and
  // whether you passed in "messages" or a "prompt", you
  // will get a different output shape
  choices: (NonStreamingChoice | StreamingChoice | NonChatChoice)[];
  created: number; // Unix timestamp
  model: string;
  object: 'chat.completion' | 'chat.completion.chunk';
  // For non-streaming responses only. For streaming responses,
  // see "Querying Cost and Stats" below.
  usage?: {
    completion_tokens: number; // Equivalent to "native_tokens_completion" in the /generation API
    prompt_tokens: number; // Equivalent to "native_tokens_prompt"
    total_tokens: number; // Sum of the above two fields
  };
};

export type NonChatChoice = {
  finish_reason: string | null;
  text: string;
  error?: Error;
};

export type NonStreamingChoice = {
  finish_reason: string | null; // Depends on the model. Ex: 'stop' | 'length' | 'content_filter' | 'tool_calls' | 'function_call'
  message: ResponseMessage;
  error?: Error;
};

export type StreamingChoice = {
  finish_reason: string | null;
  delta: {
    content: string | null;
    role?: string;
    tool_calls?: ToolCall[];
    // Deprecated, replaced by tool_calls
    function_call?: FunctionCall;
  };
  error?: Error;
};

