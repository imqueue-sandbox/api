/*!
 * ISC License
 *
 * Copyright (c) 2018, Imqueue Sandbox
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLResolveInfo,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';
import {
    fromGlobalId,
    mutationWithClientMutationId,
    toGlobalId
} from 'graphql-relay';
import {
    USER_DATA_EMPTY,
    USER_EMAIL_EMPTY,
    USER_FIRST_NAME_EMPTY,
    USER_LAST_NAME_EMPTY,
    USER_PASSWORD_EMPTY,
} from '../ResponseError';
import { selectedFields, toOutputFields } from '../helpers';
import { userType } from '../entities';
import { FieldValidationDefinitions } from 'graphql-validity/lib';
import { validateOwner, verifyRequestForOwner } from '../validators';
import { toInputFields } from '../helpers';

FieldValidationDefinitions['Mutation:updateUser'] = [validateOwner];

const inputFields: any = toInputFields(userType);
delete inputFields.cars;

inputFields.cars = {
    type: new GraphQLList(new GraphQLInputObjectType({
        name: 'UserCar',
        description: 'User car association object',
        fields: {
            carId: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Identifier of car object from cars database',
            },
            regNumber: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Car registration number',
            },
        },
    })),
    description: 'List of cars associated with the user',
};

const outputFields: any = toOutputFields(userType);
delete outputFields.password;

/**
 * GraphQL Mutation: updateUser - modifies user data
 */
export const updateUser = mutationWithClientMutationId({
    name: 'updateUser',
    description: 'Updates given user data fields with a given values',
    inputFields,
    outputFields,
    async mutateAndGetPayload(
        args: any,
        context: any,
        info: GraphQLResolveInfo,
    ) {
        if (typeof args.isAdmin !== 'undefined') {
            verifyRequestForOwner(info);
        }

        if (args.id) {
            args._id = fromGlobalId(args.id).id;
            delete args.id;

            if (Object.keys(args).length <= 1) {
                throw USER_DATA_EMPTY;
            }
        } else {
            if (!args.email) {
                throw USER_EMAIL_EMPTY;
            }

            else if (!args.password) {
                throw USER_PASSWORD_EMPTY;
            }

            else if (!args.firstName) {
                throw USER_FIRST_NAME_EMPTY;
            }

            else if (!args.lastName) {
                throw USER_LAST_NAME_EMPTY;
            }
        }

        const result = await context.user.update(
            args, selectedFields(info, { id: '_id' }));
        result.id = toGlobalId('User', result._id);
        delete result._id;

        return result;
    }
});