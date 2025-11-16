import { container } from "tsyringe";
import { AuthRepository } from "../repositories/authRepository.js";
import { AIService } from "../services/ai/ai.service.js";

container.registerSingleton("AuthRepository", AuthRepository);
container.registerSingleton(AIService, AIService);