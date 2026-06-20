## Directory of US and European API Providers

The following catalog lists US and European inference platforms, gateways, and aggregators [cite: 14, 23, 24, 26]. These services focus on reliable uptimes, edge optimization, and varied model selections [cite: 2, 14, 23].

| Provider Name | Website URL | API Base URL (OpenAI-compatible) | Free Tier / Pricing Highlight | Notable Models Available | API Key Env Variable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenRouter** | `https://openrouter.ai` | `https://openrouter.ai/api/v1` | 20+ free models, 20 RPM / 50 RPD limit [cite: 23] | DeepSeek R1, Llama 3.3, Gemma 3 [cite: 15, 27] | `OPENROUTER_API_KEY` |
| **Google AI Studio** | `https://aistudio.google.com` | `https://generativelanguage.googleapis.com/v1beta` | 1500 RPD (Flash), 50 RPD (Pro) free [cite: 24] | Gemini 2.5 Flash, 1.5 Pro, Gemma 3 [cite: 23, 24] | `GEMINI_API_KEY` |
| **Groq** | `https://groq.com` | `https://api.groq.com/openai/v1` | 30 RPM, 14,400 RPD permanent free tier [cite: 24, 28] | Llama 4 Scout, Llama 3.3 70B, Qwen3 [cite: 23, 25] | `GROQ_API_KEY` |
| **Cloudflare Workers AI** | `https://cloudflare.com` | `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run` | 10K Neurons/day free (~300K/mo) [cite: 24, 29] | Llama 3.3 70B, Gemma 4, Kimi K2.5 [cite: 29] | `CLOUDFLARE_API_KEY` |
| **GitHub Models** | `https://github.com` | `https://models.github.ai/inference` | Free prototyping for GitHub accounts [cite: 30] | GPT-5, Claude 3.5 Sonnet, DeepSeek R1 [cite: 28, 29] | `GITHUB_TOKEN` |
| **Cohere** | `https://cohere.com` | `https://api.cohere.com/v2` | 1,000 requests/mo trial (non-commercial) [cite: 23, 31] | Command R+, Command A, Aya Expanse [cite: 22, 24] | `COHERE_API_KEY` |
| **Mistral AI** | `https://mistral.ai` | `https://api.mistral.ai/v1` | Free Experiment Plan: 1B tokens/mo [cite: 20, 24] | Codestral, Mistral Large 3, Mistral Small 4 [cite: 21, 24] | `MISTRAL_API_KEY` |
| **Cerebras** | `https://cerebras.ai` | `https://api.cerebras.ai/v1` | 1M tokens/day free [cite: 22, 23] | gpt-oss-120b, Llama 3.1 70B, zai-glm-4.7 [cite: 32] | `CEREBRAS_API_KEY` |
| **Hugging Face** | `https://huggingface.co` | `https://router.huggingface.co/v1` | $0.10/mo serverless credits (renewed) [cite: 23, 31] | Llama 3.3 70B, Qwen 2.5 72B, Flux [cite: 23, 28] | `HF_TOKEN` |
| **NVIDIA NIM** | `https://build.nvidia.com` | `https://integrate.api.nvidia.com/v1` | ~1,000 RPD, 40 RPM (phone verification) [cite: 20, 23] | Nemotron-3 Super, z-ai/glm-5.1, Kimi k2.6 [cite: 23, 26] | `NVIDIA_API_KEY` |
| **SambaNova Cloud** | `https://sambanova.ai` | `https://api.sambanova.ai/v1` | Free tier (20-480 RPM), $5 trial credit [cite: 24, 33] | Llama 4 Maverick, DeepSeek R1, Llama 3.3 [cite: 33, 34] | `SAMBANOVA_API_KEY` |
| **Together AI** | `https://together.ai` | `https://api.together.xyz/v1` | $1-5 signup credits, 200+ open-source models [cite: 33] | Llama 3.3, Qwen, DeepSeek [cite: 23, 33] | `TOGETHER_API_KEY` |
| **Fireworks AI** | `https://fireworks.ai` | `https://api.fireworks.ai/inference/v1` | $1 trial credits (thousands of free calls) [cite: 22, 31] | Llama, Mixtral, Stable Diffusion [cite: 22, 31] | `FIREWORKS_API_KEY` |
| **Baseten** | `https://baseten.co` | `https://app.baseten.co/v1` | $30 trial credit, pay by compute time [cite: 22, 31] | Serves deployable custom open models [cite: 14, 35] | `BASETEN_API_KEY` |
| **Nebius AI** | `https://nebius.com` | `https://api.studio.nebius.com/v1` | $1 trial credits, EU-sovereign clouds [cite: 22, 31] | Qwen3-235b, Llama 3.3 [cite: 27, 31] | `NEBIUS_API_KEY` |
| **DeepInfra** | `https://deepinfra.com` | `https://api.deepinfra.com/v1/openai` | $5 signup credits, low floor pricing ($0.02/1M) [cite: 23] | Qwen 3, DeepSeek V4, Llama 3.3 [cite: 36] | `DEEPINFRA_API_KEY` |
| **Kimchi Inference** | `https://kimchi.dev` | `https://llm.cast.ai/openai/v1` | $50/mo free credits for developers [cite: 15, 37] | kimi-k2.6, minimax-m2.7, nemotron-3-super [cite: 38] | `KIMCHI_API_KEY` |
| **TokenRouter** | `https://tokenrouter.io` | `https://api.tokenrouter.io/v1` | Free MiniMax M3 API access [cite: 17] | MiniMax M3, Claude 4, GPT-5 [cite: 3, 15] | `TOKENROUTER_API_KEY` |
| **Aerolink** | `https://aerolink.ai` | `https://api.aerolink.ai/v1` | Free $350+ rolling credits ($10/5 hours) [cite: 15, 17] | Claude Opus, Claude Sonnet 4.6 [cite: 17] | `AEROLINK_API_KEY` |
| **B.AI** | `https://b.ai` | `https://api.b.ai/v1` | 500K credits on signup, no card [cite: 15, 39] | Kimi k2.5, GLM-5, GLM 5.1 [cite: 39] | `BAI_API_KEY` |
| **Lightning AI Models** | `https://lightning.ai` | `https://api.lightning.ai/v1` | 15 free credits/mo ($15 value, up to 30M tokens) [cite: 15, 16] | Claude, GPT, Gemini, DeepSeek [cite: 17, 39] | `LIGHTNING_API_KEY` |
| **LLM7.io** | `https://llm7.io` | `https://api.llm7.io/v1` | 30 RPM basic tier without signup [cite: 22] | DeepSeek R1, Qwen2.5 Coder, Gemini 2.5 [cite: 29] | `LLM7_API_KEY` |
| **Kluster AI** | `https://kluster.ai` | `https://api.kluster.ai/v1` | $5 trial credits, highly scalable [cite: 40] | DeepSeek R1, Llama 4, Qwen3-235B [cite: 22, 40] | `KLUSTER_API_KEY` |
| **OVHcloud AI Endpoints** | `https://endpoints.ovh.com` | `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1` | Free 2 RPM anonymous beta tier [cite: 26] | Qwen3Guard, gpt-oss-20b, Llama 3.3 [cite: 24, 26] | `OVH_API_KEY` |
| **Glhf.chat** | `https://glhf.chat` | `https://glhf.chat/api/openai/v1` | Unlimited free models with high limits [cite: 23] | Llama 3.1 70B, Mixtral 8x7B [cite: 27] | `GLHF_API_KEY` |
| **Aion Labs** | `https://aionlabs.ai` | `https://api.aionlabs.ai/v1` | Daily free token allowance on registration [cite: 30] | aion-2.0, aion-1.0, aion-1.0-mini [cite: 30] | `AION_API_KEY` |
| **xAI (Grok)** | `https://x.ai` | `https://api.x.ai/v1` | $25 signup credits, no card required [cite: 30] | Grok-2, Grok-2 Mini [cite: 23] | `XAI_API_KEY` |
| **Nscale** | `https://nscale.com` | `https://inference.api.nscale.com/v1` | Fair-use free tier on registration [cite: 27] | Llama 3.3 70B, DeepSeek R1 Distill [cite: 27] | `NSCALE_API_KEY` |
| **AI21 Labs** | `https://ai21.com` | `https://api.ai21.com/studio/v1` | $10 trial credits expiring in 3 months [cite: 23, 29] | Jamba Large, Jamba Mini [cite: 30] | `AI21_API_KEY` |
| **Upstage** | `https://upstage.ai` | `https://api.upstage.ai/v1` | $10 trial credits for Solar models [cite: 23, 31] | Solar Pro, Solar Mini [cite: 31] | `UPSTAGE_API_KEY` |
| **NLP Cloud** | `https://nlpcloud.com` | `https://api.nlpcloud.com/v1` | $15 trial credits with phone verification [cite: 31] | Chat & translation models [cite: 18, 23] | `NLPCLOUD_API_KEY` |
| **Modal** | `https://modal.com` | `https://api.modal.com` | $5/mo signup, $30/mo with card added [cite: 31] | Hostable open-weight models [cite: 31] | `MODAL_TOKEN_ID` |
| **Inference.net** | `https://inference.net` | `https://api.inference.net/v1` | $1 free, $25 on survey completion [cite: 31] | DeepSeek R1, Llama 3.1 [cite: 23] | `INFERENCE_NET_API_KEY` |
| **Hyperbolic** | `https://hyperbolic.xyz` | `https://api.hyperbolic.xyz/v1` | $1 free trial credit, 131K context [cite: 23, 40] | Llama 3.1 405B, DeepSeek V3 [cite: 23] | `HYPERBOLIC_API_KEY` |
| **Scaleway** | `https://scaleway.com` | `https://api.scaleway.ai/v1` | 1M free tokens, EU/GDPR cloud [cite: 31, 41] | Mistral, Llama, Qwen [cite: 23] | `SCALEWAY_API_KEY` |
| **OpenCode Zen** | `https://opencodezen.com` | `https://api.opencodezen.com/v1` | Free curated gateway [cite: 31] | Big Pickle Stealth, DeepSeek V4 Flash [cite: 31] | `OPENCODE_ZEN_API_KEY` |
| **Replicate** | `https://replicate.com` | `https://api.replicate.com/v1` | Small trial credits at registration [cite: 23] | 1000+ text and generation models [cite: 14, 24] | `REPLICATE_API_TOKEN` |
| **Lepton AI** | `https://lepton.ai` | `https://api.lepton.ai/api` | $10 free trial credits for developers [cite: 24, 40] | Llama, Mistral, Stable Diffusion [cite: 23] | `LEPTON_API_KEY` |
| **Friendli AI** | `https://friendli.ai` | `https://api.friendli.ai/v1` | $10 free trial credits [cite: 23] | Popular open-weight models [cite: 23] | `FRIENDLI_API_KEY` |
| **Cerebrium** | `https://cerebrium.com` | `https://api.cerebrium.com/v1` | $30 free trial credits [cite: 23] | Deployable open models, serverless [cite: 23, 37] | `CEREBRIUM_API_KEY` |
| **Requesty** | `https://requesty.ai` | `https://api.requesty.ai/v1` | Free monthly credit allocations [cite: 23] | Multi-provider routing [cite: 23] | `REQUESTY_API_KEY` |
| **Ollama Cloud** | `https://ollama.com` | `https://api.ollama.com` | Free usage-based tier resetting every 5 hours [cite: 26] | Llama, Qwen, Mistral [cite: 26] | `OLLAMA_API_KEY` |
| **ZenMux** | `https://zenmux.com` | `https://api.zenmux.com/v1` | Free sandbox API tier [cite: 17] | Aggregated open-weight models [cite: 17] | `ZENMUX_API_KEY` |
| **CrofAI** | `https://crofai.com` | `https://api.crofai.com/v1` | Promo credits at registration [cite: 26] | Cost-effective open weights [cite: 26] | `CROFAI_API_KEY` |
| **Routeway AI** | `https://routeway.ai` | `https://api.routeway.ai/v1` | Free gateway routing tier [cite: 26] | Routed open-source models [cite: 26] | `ROUTEWAY_API_KEY` |
| **FastRouter** | `https://fastrouter.ai` | `https://api.fastrouter.ai/v1` | Trial credits [cite: 26] | Multi-model routing [cite: 26] | `FASTROUTER_API_KEY` |
| **AiQu** | `https://aiqu.se` | `https://api.aiqu.se/v1` | Swedish cloud free sandbox [cite: 14] | EU sovereign hosted open weights [cite: 37] | `AIQU_API_KEY` |
| **Airon** | `https://airon.io` | `https://api.airon.io/v1` | Serverless trial credits [cite: 37] | Hosted open-source LLMs [cite: 37] | `AIRON_API_KEY` |
| **AKI.IO** | `https://aki.io` | `https://api.aki.io/v1` | 10 EUR trial credits [cite: 37] | Llama, Qwen, Mistral [cite: 37] | `AKI_API_KEY` |
| **ARK Labs** | `https://arklabs.ai` | `https://api.arklabs.ai/v1` | EU sovereign free tier [cite: 37] | Regulated environment models [cite: 37] | `ARK_API_KEY` |
| **Beam** | `https://beam.cloud` | `https://api.beam.cloud/v1` | Serverless GPU free trial tier [cite: 37] | Custom hostable models [cite: 37] | `BEAM_API_KEY` |
| **BentoCloud** | `https://bentoml.com` | `https://api.bentocloud.com/v1` | Free trial credits [cite: 37] | Llama 2, SD, Flan-T5 [cite: 37] | `BENTOML_API_KEY` |
| **Berget AI** | `https://berget.ai` | `https://api.berget.ai/v1` | EU sovereign free tier [cite: 37] | EU compliant models [cite: 37] | `BERGET_API_KEY` |
| **Cortecs AI** | `https://cortecs.ai` | `https://api.cortecs.ai/v1` | Gateway free trial [cite: 37] | European smart-routing models [cite: 37] | `CORTECS_API_KEY` |
| **EUrouter** | `https://eurouter.com` | `https://api.eurouter.com/v1` | 1K requests/month free [cite: 37] | Over 100 GDPR models [cite: 37] | `EUROUTER_API_KEY` |
| **Infercom** | `https://infercom.ai` | `https://api.infercom.ai/v1` | Free tier, EU hosted [cite: 37] | Sovereign open models [cite: 37] | `INFERCOM_API_KEY` |
| **IonRouter** | `https://ionrouter.com` | `https://api.ionrouter.com/v1` | Free tier options [cite: 37] | Open-source LLMs [cite: 37] | `IONROUTER_API_KEY` |
| **Jina AI** | `https://jina.ai` | `https://api.jina.ai/v1` | 10M free tokens on signup [cite: 37] | Embeddings & rerankers [cite: 37] | `JINA_API_KEY` |
| **Lambda AI** | `https://lambdalabs.com` | `https://api.lambdalabs.com/v1` | Trial cloud credits [cite: 14, 40] | Deployable LLMs [cite: 37] | `LAMBDA_API_KEY` |
| **Monster API** | `https://monsterapi.ai` | `https://api.monsterapi.ai/v1` | Free trial credits [cite: 37] | Llama 2, Zephyr, Falcon [cite: 37] | `MONSTER_API_KEY` |
| **OctoAI** | `https://octoai.cloud` | `https://api.octoai.cloud/v1` | Free trial credits [cite: 37] | Production GenAI models [cite: 37] | `OCTOAI_API_KEY` |
| **Prem AI** | `https://premai.io` | `https://api.premai.io/v1` | Free tier [cite: 37] | Unified deployment models [cite: 37] | `PREM_API_KEY` |
| **Synexa** | `https://synexa.io` | `https://api.synexa.io/v1` | $0.0015/image, trial credits [cite: 37] | 100+ production models [cite: 37] | `SYNEXA_API_KEY` |
| **Tokenware** | `https://tokenware.io` | `https://api.tokenware.io/v1` | Free trial credits [cite: 37] | 200+ models [cite: 37] | `TOKENWARE_API_KEY` |
| **Portkey AI** | `https://portkey.ai` | `https://api.portkey.sh/v1` | Free developer tier with request telemetry [cite: 2] | Provider models mapped dynamically [cite: 1] | `PORTKEY_API_KEY` |
| **Voyage AI** | `https://voyageai.com` | `https://api.voyageai.com/v1` | Free tier credits available [cite: 37] | High quality embeddings [cite: 37] | `VOYAGE_API_KEY` |
| **Featherless AI**| `https://featherless.ai` | `https://api.featherless.ai/v1` | Free tier trial [cite: 41] | 200+ open-source models [cite: 41] | `FEATHERLESS_API_KEY` |
| **Morph** | `https://morph.chat` | `https://api.morph.chat/v1` | Agentic free credits [cite: 41] | Autonomous LLMs [cite: 41] | `MORPH_API_KEY` |
| **Predibase** | `https://predibase.com` | `https://connect.predibase.com/v1` | Free credits on signup [cite: 41] | Custom fine-tuned LoRA models [cite: 41] | `PREDIBASE_API_KEY` |
| **FerryAPI** | `https://ferryapi.com` | `https://api.ferryapi.com/v1` | Prepay signup bonus [cite: 37] | Qwen, DeepSeek, Kimi [cite: 37] | `FERRYAPI_API_KEY` |
| **Fast Pivot** | `https://fastpivot.io` | `https://api.fastpivot.io/v1` | Prepaid credit trial [cite: 37] | Aggregated open-weight models [cite: 37] | `FASTPIVOT_API_KEY` |
| **General Compute**| `https://generalcompute.com`| `https://api.generalcompute.com/v1`| Trial compute hours [cite: 37] | Latency-critical coding models [cite: 37] | `GENERAL_COMPUTE_API_KEY` |
| **CoreWeave** | `https://coreweave.com` | `https://api.coreweave.com/v1` | Trial cloud credits [cite: 37] | Deployable open LLMs [cite: 37] | `COREWEAVE_API_KEY` |
| **Amazon Bedrock**| `https://aws.amazon.com/bedrock`| `https://bedrock-runtime.{region}.amazonaws.com`| AWS Free Tier credits [cite: 37] | Claude, Llama, Jurassic [cite: 37] | `AWS_SECRET_ACCESS_KEY` |
| **Anyscale** | `https://anyscale.com` | `https://api.endpoints.anyscale.com/v1`| Signup trial credits [cite: 37] | Curated open weight models [cite: 37] | `ANYSCALE_API_KEY` |
| **DeepInfra Native**| `https://deepinfra.com` | `https://api.deepinfra.com/v1/inference/{model}` | $5 Native API credits [cite: 42, 43] | Flux, Speech, zero-shot models [cite: 42] | `DEEPINFRA_API_KEY` |
| **Perplexity API** | `https://perplexity.ai` | `https://api.perplexity.ai` | Trial credits for API subscribers [cite: 44] | Llama 3.1 70B, Qwen 2.5 72B [cite: 26] | `PERPLEXITY_API_KEY` |
| **Venice.ai** | `https://venice.ai` | `https://api.venice.ai/v1` | Daily limits allowed for free tier [cite: 23] | Llama 3.1 405B, Dolphin Mixtral [cite: 23] | `VENICE_API_KEY` |
| **Chutes.ai** | `https://chutes.ai` | `https://api.chutes.ai/v1` | Free community tier [cite: 23] | DeepSeek-R1, Qwen 2.5 72B [cite: 23] | `CHUTES_API_KEY` |
| **Packet.ai** | `https://packet.ai` | `https://api.packet.ai/v1` | Billed per token, trial credits [cite: 37] | RTX PRO 6000 managed models [cite: 37] | `PACKET_API_KEY` |
| **Verda** | `https://verda.ai` | `https://api.verda.ai/v1` | Serverless trial [cite: 37] | European optimized LLMs [cite: 37] | `VERDA_API_KEY` |

---

## Directory of Chinese and Asian API Providers

Providers within this region often deliver highly aggressive per-token pricing structures [cite: 10]. These infrastructures are heavily optimized for both dense and mixture-of-experts open weights [cite: 9, 10].

| Provider Name | Website URL | API Base URL (OpenAI-compatible) | Free Tier / Pricing Highlight | Notable Models Available | API Key Env Variable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SiliconFlow** | `https://siliconflow.cn` | `https://api.siliconflow.cn/v1` | Permanent free models, 1K RPM [cite: 26, 40] | DeepSeek R1, MiniMax-M2, Qwen3 [cite: 10, 14, 26] | `SILICONFLOW_API_KEY` |
| **Z AI (Zhipu AI)** | `https://bigmodel.cn` | `https://open.bigmodel.cn/api/paas/v4` | Permanent free models, no card required [cite: 30] | GLM-4.7-Flash, GLM-4.5-Flash [cite: 30] | `ZHIPU_API_KEY` |
| **ModelScope** | `https://modelscope.cn` | `https://api-inference.modelscope.cn/v1` | 2,000 requests/day free, registration only [cite: 27] | Qwen 3.5, Qwen Image [cite: 27] | `MODELSCOPE_API_KEY` |
| **Alibaba Model Studio**| `https://alibabacloud.com` | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1` | 1M free tokens per Qwen model [cite: 30] | Qwen series, open weight models [cite: 26, 29] | `DASHSCOPE_API_KEY` |
| **DeepSeek AI** | `https://deepseek.com` | `https://api.deepseek.com/v1` | 10M free tokens on signup, cheap pricing [cite: 23] | DeepSeek-V3, DeepSeek-R1 [cite: 23] | `DEEPSEEK_API_KEY` |
| **MiniMax AI** | `https://minimaxi.com` | `https://api.minimax.chat/v1` | Free trial credits on registration [cite: 17] | MiniMax M3, M2.7 [cite: 17] | `MINIMAX_API_KEY` |
| **Moonshot AI / Kimi**| `https://kimi.ai` | `https://api.moonshot.cn/v1` | Free trial credits at signup [cite: 31] | Kimi-K2.7, Kimi-VL [cite: 15, 45] | `MOONSHOT_API_KEY` |
| **Yi AI (01.AI)** | `https://01.ai` | `https://api.01.ai/v1` | Initial trial credits on signup [cite: 23] | Yi-Large, Yi-34B [cite: 23] | `YI_API_KEY` |
| **Tencent Hunyuan**| `https://cloud.tencent.com`| `https://api.hunyuan.tencent.com/v1` | Free trial credits for cloud developers [cite: 25] | Hunyuan-Turbo, Hunyuan-Pro [cite: 20] | `HUNYUAN_API_KEY` |
| **Baidu Qianfan** | `https://cloud.baidu.com` | `https://qianfan.baidubce.com/v2` | Free trial credits, ERNIE Speed free tier [cite: 20] | ERNIE-Lite, ERNIE-Speed [cite: 20] | `QIANFAN_API_KEY` |
| **ByteDance Ark** | `https://volcengine.com` | `https://ark.cn-beijing.volces.com/api/v3` | Millions of free signup tokens [cite: 20] | Doubao-pro, Doubao-lite [cite: 20] | `VOLCENGINE_API_KEY` |
| **Spark AI (iFlytek)**| `https://xfyun.cn` | `https://spark-api.xf-yun.com/v1/chat` | 2M-5M free tokens on signup [cite: 20] | Spark-Pro, Spark-Lite [cite: 20] | `SPARK_API_KEY` |
| **Xiaomi Mimo** | `https://mi.com` | `https://api.mimo.xiaomi.com/v1` | Highly competitive pricing ($0.14/1M) [cite: 41] | mimo-v2.5-pro, mimo-v2.5 [cite: 27] | `MIMO_API_KEY` |
| **StreamLake (Kuaishou)**| `https://streamlake.com`| `https://api.streamlake.com/v1` | Developer trial credits [cite: 20] | Kuaishou KwaiYong [cite: 20] | `STREAMLAKE_API_KEY` |
| **Stepfun** | `https://stepfun.com` | `https://api.stepfun.com/v1` | Registration free credits [cite: 20] | Step-3.5-flash, Step-3-pro [cite: 20] | `STEPFUN_API_KEY` |
| **Gitee AI** | `https://gitee.com/ai` | `https://ai.gitee.com/v1` | Developer free sandbox tokens [cite: 20] | Hosted Qwen and DeepSeek models [cite: 20] | `GITEE_AI_TOKEN` |
| **Baichuan AI** | `https://baichuan-ai.com` | `https://api.baichuan-ai.com/v1` | Trial credits on signup [cite: 20] | Baichuan4, Baichuan2 [cite: 20] | `BAICHUAN_API_KEY` |
| **SenseTime** | `https://sensetime.com` | `https://api.sensenova.cn/v1` | Trial credits for new developers [cite: 20] | SenseChat-5, SenseChat-4 [cite: 20] | `SENSENOVA_API_KEY` |
| **Linkos AI** | `https://linkos.ai` | `https://api.linkos.ai/v1` | Gateway free trial [cite: 20] | Routed Asian frontier models [cite: 20] | `LINKOS_API_KEY` |
| **Baobaogou AI** | `https://baobaogou.com` | `https://api.baobaogou.com/v1` | Regional trial credits [cite: 20] | Open-source models [cite: 20] | `BAOBAOGOU_API_KEY` |

---

## Directory of Local, Self-Hosted, and Gateway Solutions

Local engines provide absolute data privacy and zero token-based operational expenditure after hardware provisioning [cite: 21, 22]. Local proxies act as compliant boundary nodes [cite: 21].

| Platform Name | Project URL | Local API Base URL | Cost Highlight | Notable Models Serviced | Key Implementation Command / Env |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AegisGate** | `https://github.com/ax128/AegisGate` | `http://localhost:18080/v1` | $0, self-hosted security gateway [cite: 21] | Proxies Claude, GPT, Llama [cite: 21] | `docker compose up -d` [cite: 21] |
| **FreeLLMAPI** | `https://github.com/open-free-llm-api/freellm-hub-data` | `http://localhost:3000/v1` | $0, self-hosted proxy aggregator [cite: 37] | Routes 60+ models [cite: 46] | `git clone` + configure keys [cite: 46] |
| **LM Studio** | `https://lmstudio.ai` | `http://localhost:1234/v1` | Free local GUI & API engine [cite: 20] | Llama, Qwen GGUF formats [cite: 20] | Launch Local Server in UI [cite: 20] |
| **Ollama Local** | `https://ollama.com` | `http://localhost:11434/v1` | Free local command-line engine [cite: 20] | Llama 3, Qwen 2.5, Mistral [cite: 20] | `ollama run llama3` |
| **llama.cpp** | `https://github.com/ggerganov/llama.cpp` | `http://localhost:8080/v1` | Free local C/C++ inference engine [cite: 20] | Any GGUF models [cite: 20] | `./llama-server` [cite: 20] |
| **vLLM Engine** | `https://github.com/vllm-project/vllm` | `http://localhost:8000/v1` | Free high-throughput local engine [cite: 2, 4] | AWQ, GPTQ, FP16 serverless [cite: 4] | `python -m vllm.entrypoints.openai.api_server` |
| **SGLang Server** | `https://github.com/sgl-project/sglang` | `http://localhost:30000/v1` | Free latency-optimized local server [cite: 37] | High-throughput open weights [cite: 37] | `python -m sglang.launch_server` |
| **LocalAI** | `https://github.com/mudler/LocalAI` | `http://localhost:8080/v1` | Free multi-modality local server | Llama, Whisper, Stable Diffusion | `docker run localai` |
| **Tabby AI** | `https://github.com/TabbyML/tabby` | `http://localhost:8080/v1` | Free self-hosted code completion engine | Tabby coder models | `tabby serve --model` |
| **Text Gen WebUI**| `https://github.com/oobabooga/text-generation-webui` | `http://localhost:5000/v1` | Free local web browser interface | Transformers, ExLlamaV2 | `python server.py --api` |
| **KoboldCPP** | `https://github.com/LostRuins/koboldcpp` | `http://localhost:5001/v1` | Free local GGUF parser engine | GGUF text models | `python koboldcpp.py` |
| **Aphrodite** | `https://github.com/PygmalionAI/aphrodite-engine` | `http://localhost:2242/v1` | Free Pygmalion local inference | Pygmalion / Hugging Face weights | `python -m aphrodite.endpoints.openai.api_server` |
| **MindSpore** | `https://github.com/mindspore-ai/mindspore` | `http://localhost:8080/v1` | Free local deep learning framework | MindSpore-optimized models | `python -m mindspore.entrypoints` |
| **ONNX Runtime** | `https://github.com/microsoft/onnxruntime` | `http://localhost:8090/v1` | Free multi-platform hardware acceleration | ONNX quantized text models | Launch ONNX local API endpoint |

