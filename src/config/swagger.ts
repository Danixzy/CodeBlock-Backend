import { userSwagger } from '../domains/users/swagger';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Template API',
    version: '1.0.0',
    description: 'API Documentation',
  },
  components: {
    schemas: {
      ...userSwagger.components.schemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    ...userSwagger.paths,
  },
  tags: [
    ...(userSwagger.tags || []),
  ],
};