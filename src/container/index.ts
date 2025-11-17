import { container } from 'tsyringe';
import { AuthRepository } from '../repositories/authRepository.js';
import { PhotoshopProvider } from '../providers/photoshopProvider.js';
import { GeminiProvider } from '../providers/geminiProvider.js';
import { AIService } from '../services/ai/ai.service.js';

container.registerSingleton('AuthRepository', AuthRepository);
container.registerSingleton(PhotoshopProvider, PhotoshopProvider);
container.registerSingleton(GeminiProvider, GeminiProvider);
container.registerSingleton(AIService, AIService);
