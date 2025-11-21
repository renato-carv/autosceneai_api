import { container } from 'tsyringe';
import { AuthRepository } from '../repositories/authRepository.js';
import { PhotoshopProvider } from '../providers/photoshopProvider.js';
import { GeminiProvider } from '../providers/geminiProvider.js';
import { S3Provider } from '../providers/s3Provider.js';
import { AIService } from '../services/ai/ai.service.js';

container.registerSingleton('AuthRepository', AuthRepository);
container.registerSingleton('PhotoshopProvider', PhotoshopProvider);
container.registerSingleton('GeminiProvider', GeminiProvider);
container.registerSingleton('S3Provider', S3Provider);
container.registerSingleton('AIService', AIService);
