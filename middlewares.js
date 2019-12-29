import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Utube";
    res.locals.routes = routes;
    next();
};