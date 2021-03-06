/*!
 * IMQ-RPC Service Client: Auth
 *
 * Copyright (c) 2018, imqueue.com <support@imqueue.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
import { IMQClient, IMQDelay, remote, profile } from '@imqueue/rpc';

export namespace auth {
    export class AuthClient extends IMQClient {

        /**
         * Logs user in
         *
         * @param {string} email - user email address
         * @param {string} password - user password hash
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<string|null>}
         */
        @profile()
        @remote()
        public async login(email: string, password: string, delay?: IMQDelay): Promise<string|null> {
            return await this.remoteCall<string|null>(...arguments);
        }

        /**
         * Logs user out
         *
         * @param {string} token - jwt auth user token
         * @param {string} [verifyEmail] - email to verify from a given token (if provided - must match)
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<boolean>}
         */
        @profile()
        @remote()
        public async logout(token: string, verifyEmail?: string, delay?: IMQDelay): Promise<boolean> {
            return await this.remoteCall<boolean>(...arguments);
        }

        /**
         * *>
         * Verifies if user token is valid, and if so - returns an associated user
         * object
         *
         * @param {string} token
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<object | null>}
         */
        @profile()
        @remote()
        public async verify(token: string, delay?: IMQDelay): Promise<object | null> {
            return await this.remoteCall<object | null>(...arguments);
        }

    }
}
