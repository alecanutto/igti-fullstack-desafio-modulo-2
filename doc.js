export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "Grades Control API using Node.JS and Express.",
        "version": "1.0.0",
        "title": "Grades Control API",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "ale.canutto@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "localhost:3000",
    "tags": [{
            "name": "grades",
            "description": "Grades management"
        }
    ],
    "paths": {
        "/grades": {
            "post": {
                "tags": [
                    "grade"
                ],
                "summary": "Add a new grade",
                "description": "",
                "operationId": "addGrade",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                        "in": "body",
                        "name": "body",
                        "description": "",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/ApiResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Get all grades",
                "description": "Return all finds grades",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Grade"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request"
                    }
                }
            }
        },
        "/grades/{id}": {
            "put": {
                "tags": [
                    "grade"
                ],
                "summary": "Update an existing grade",
                "description": "",
                "operationId": "updateGrade",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                        "in": "body",
                        "name": "body",
                        "description": "",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeDTO"
                        }
                    }, {
                        "in": "path",
                        "name": "id",
                        "description": "ID of grade",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/ApiResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Find grade by ID",
                "description": "Returns a single grade",
                "operationId": "getGradeById",
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "ID of grade to return",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Grade not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "delete": {
                "tags": [
                    "grade"
                ],
                "summary": "Delete a grade",
                "description": "",
                "operationId": "deleteById",
                "produces": [
                    "application/xml",
                    "application/json"
                ],
                "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Grade id to delete",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation",
                    },
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Grade not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },

        },
        "/grades/gradesTotal/{student}/{subject}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "See a student's total grade in a discipline",
                "description": "",
                "operationId": "gradesTotal",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                        "in": "path",
                        "name": "student",
                        "description": "name of the student",
                        "required": true,
                        "type": "string"
                    }, {
                        "in": "path",
                        "name": "subject",
                        "description": "subject of the grade",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/grades/gradesAvg/{subject}/{type}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Consult the average of the grades of a given subject and type",
                "description": "",
                "operationId": "gradesAvg",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                        "in": "path",
                        "name": "subject",
                        "description": "subject of the grade",
                        "required": true,
                        "type": "string"
                    }, {
                        "in": "path",
                        "name": "type",
                        "description": "type of the subject",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/grades/bestGrades/{subject}/{type}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Return the three best grades according to a determined subject and type.",
                "description": "",
                "operationId": "bestGrades",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                        "in": "path",
                        "name": "subject",
                        "description": "subject of the grade",
                        "required": true,
                        "type": "string"
                    }, {
                        "in": "path",
                        "name": "type",
                        "description": "type of the subject",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
    },
    "definitions": {
        "Grade": {
            "type": "object",
            "required": [
                "student",
                "subject",
                "type",
                "value"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "student": {
                    "type": "string",
                    "example": "Alessandra"
                },
                "subject": {
                    "type": "string",
                    "example": "Node.JS"
                },
                "type": {
                    "type": "string",
                    "example": "Bootcamp"
                },
                "value": {
                    "type": "integer",
                    "format": "int32",
                    "example": "1"
                },
                "timestamp": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "GradeDTO": {
            "type": "object",
            "required": [
                "student",
                "subject",
                "type",
                "value"
            ],
            "properties": {
                "student": {
                    "type": "string",
                    "example": "Alessandra"
                },
                "subject": {
                    "type": "string",
                    "example": "Node.JS"
                },
                "type": {
                    "type": "string",
                    "example": "Bootcamp"
                },
                "value": {
                    "type": "integer",
                    "format": "int32",
                    "example": "1"
                }
            }
        },
        "ApiResponse": {
            "type": "object",
            "properties": {
                "method": {
                    "type": "string"
                },
                "field": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        }
    }
};
