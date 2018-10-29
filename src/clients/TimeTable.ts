/*!
 * IMQ-RPC Service Client: TimeTable
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

export namespace timeTable {
    export interface Reservation {
        id: number;
        carId: string;
        userId: string;
        type: string;
        startDime: string;
        duration: number;
    }

    export interface TimeTableOptions {
        start: number;
        end: number;
        maxReservations: number;
        baseTime: { [name: string]: number };
        appendTime: { [appendType: string]: { [key: string]: number } };
        timezone: string;
    }

    export class TimeTableClient extends IMQClient {

        /**
         * Returns a list of reservations starting from a given time (or from
         * current time if omitted)
         *
         * @param {string} startFrom
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<Reservation[]>}
         */
        @profile()
        @remote()
        public async list(startFrom: string, delay?: IMQDelay): Promise<Reservation[]> {
            return await this.remoteCall<Reservation[]>(...arguments);
        }

        /**
         * Makes a given reservation or throws a proper error
         * if action is not possible
         *
         * @param {Reservation} reservation
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<void>}
         */
        @profile()
        @remote()
        public async reserve(reservation: Reservation, delay?: IMQDelay): Promise<void> {
            return await this.remoteCall<void>(...arguments);
        }

        /**
         * Cancels reservation at a given time
         *
         * @param {string} reservationTime
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<boolean>}
         */
        @profile()
        @remote()
        public async cancel(reservationTime: string, delay?: IMQDelay): Promise<boolean> {
            return await this.remoteCall<boolean>(...arguments);
        }

        /**
         * Returns closes possible reservation for a selected washing type
         * and a given startTime
         *
         * @param {string} washingType
         * @param {string} startFrom
         * @param {IMQDelay} [delay] - if passed the method will be called with the specified delay over message queue
         * @return {Promise<Reservation | null>}
         */
        @profile()
        @remote()
        public async closest(washingType: string, startFrom: string, delay?: IMQDelay): Promise<Reservation | null> {
            return await this.remoteCall<Reservation | null>(...arguments);
        }

        /**
         * Returns reservation time-table configuration settings
         *
         * @return {Promise<TimeTableOptions>}
         */
        @profile()
        @remote()
        public async config(): Promise<TimeTableOptions> {
            return await this.remoteCall<TimeTableOptions>(...arguments);
        }

    }
}