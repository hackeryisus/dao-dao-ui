/* tslint:disable */
import { ChannelInfo, Coin, Cw20Coin } from "./shared-types";

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Amount =
  | {
      native: Coin;
    }
  | {
      cw20: Cw20Coin;
    };

export interface ChannelResponse {
  /**
   * How many tokens we currently have pending over this channel
   */
  balances: Amount[];
  /**
   * Information on the channel's connection
   */
  info: ChannelInfo;
  /**
   * The total number of tokens that have been sent over this channel (even if many have been returned, so balance is low)
   */
  total_sent: Amount[];
  [k: string]: unknown;
}
