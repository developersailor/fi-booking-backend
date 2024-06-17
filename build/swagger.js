"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
// src/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fi Booking API',
            version: '1.0.0',
            description: 'API documentation for the Fi Booking application',
            contact: {
                name: 'Mehmet Fiskindal',
                email: 'mehmet@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Booking: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the booking'
                        },
                        userId: {
                            type: 'string',
                            description: 'Unique identifier for the user who made the booking'
                        },
                        roomId: {
                            type: 'string',
                            description: 'Unique identifier for the room being booked'
                        },
                        startDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Start date of the booking'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'End date of the booking'
                        },
                        status: {
                            type: 'string',
                            description: 'Status of the booking',
                            enum: ['confirmed', 'pending', 'cancelled']
                        }
                    },
                    required: ['id', 'userId', 'roomId', 'startDate', 'endDate', 'status']
                },
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Username of the user'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'Password of the user'
                        }
                        // Add more properties as needed
                    },
                    required: ['id', 'username', 'email', 'password']
                },
            },
        },
    },
    apis: ['./routes/*.ts', './models/*.ts']
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map