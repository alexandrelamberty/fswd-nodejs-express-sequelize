const { Request, Response, NextFunction } = require("express");

/**
 *  Pagination middleware
 * @param {{ defaultLimit : number?, maxLimit : number? }?} options
 * @return { (req: Request, res: Response ,next: NextFunction) => undefined}
 */
const pagination = (options) => {
  //
  const defaultLimit = options?.defaultLimit ?? 20;
  const maxLimit = options?.maxLimit ?? 50;
  /**
   * @param { Request } req
   * @param { Response } res
   * @param { NextFunction } next
   */
  return (req, res, next) => {
    // Query pagination data
    const reqOffset = parseInt(req.query.offset);
    const reqLimit = parseInt(req.query.limit);

    const offset = isNaN(reqOffset) || reqOffset < 0 ? 0 : reqOffset;
    const limit =
      isNaN(reqLimit) || reqLimit <= 0
        ? defaultLimit
        : Math.min(reqLimit, maxLimit);

    req.pagination = { offset, limit };

    next();
  };
};

module.exports = pagination;
