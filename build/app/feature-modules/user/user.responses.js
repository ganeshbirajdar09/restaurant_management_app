"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_RESPONSE = void 0;
exports.USER_RESPONSE = {
    NOT_FOUND: {
        statusCode: 404,
        message: 'user not found'
    },
    UPDATE_SUCCESS: {
        statusCode: 201,
        message: 'data updated successfully'
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: 'could not update the data'
    },
    DELETE_SUCCESS: {
        statusCode: 200,
        message: 'data deleted successfully'
    },
    DELETE_FAILURE: {
        statusCode: 403,
        message: 'could not delete the data'
    },
    SOMETHING_WENT_WRONG: {
        statusCode: 500,
        message: 'something went wrong'
    },
};
//# sourceMappingURL=user.responses.js.map