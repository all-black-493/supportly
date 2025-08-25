import { google } from "@ai-sdk/google";
import { RAG } from "@convex-dev/rag";
import { components } from "../../_generated/api";

const v1Model = google.textEmbeddingModel("text-embedding-004");

const v2CompatibleModel = {
    ...v1Model,
    specificationVersion: "v2" as const,
};

const rag = new RAG(components.rag, {
    textEmbeddingModel: v2CompatibleModel,
    embeddingDimension: 3072,
});


export default rag