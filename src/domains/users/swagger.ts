export const userSwagger = {
  tags: [
    {
      name: 'Users',
      description: 'User management and authentication',
    },
  ],
  paths: {
    '/users/register': {
      post: {
        tags: ['Users'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUser',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
          },
        },
      },
    },
    '/users/login': {
      post: {
        tags: ['Users'],
        summary: 'Login an existing user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginUser',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login',
          },
        },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of users',
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User found',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateUser',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '204': {
            description: 'User deleted successfully',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateUser: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
      },
      LoginUser: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
      },
      UpdateUser: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
      },
    },
  },
};
