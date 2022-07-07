# exl_hack

## Project Details

This is an starter react project which built using:
- [React Sweet state](https://github.com/atlassian/react-sweet-state)
- [Mui](https://mui.com/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)

Works directly with [`drf-cookiecutter`](https://github.com/Ohuru-Tech/drf-cookiecutter)

### State management
The project uses [`react-sweet-state`](https://github.com/atlassian/react-sweet-state) for state management, the CRUD is set up with a store in this project as an example, you should be careful about what you want to put in redux store, usually you can use the combination of `useEffect` and `useState`, it makes sense to put things in redux when you need to persist / cache data or use them at multiple places.

Refer: this [blog post](https://medium.com/@josh_barr/react-hooks-and-redux-the-right-way-to-do-it-e8f8f8f8f8f8) for more details.

### API calls
The project has a custom axios setup to support:
- Automatic snake case to camel case conversion and vice-versa.
- Error handling with interceptors.
- Auto-add `Authorization` header with the user authorization token.

The project then uses an API object to allow calling APIs seamlessly. Refer `src/apps/exl_frontend/utils/itemApi.ts` for more details on the same.

### Project Structure
All the relavant code is inside `src/apps`, the apps are made according to a single use-case to allow separation of concern, react-sweet-state allows being able to have a "local" sort of redux store for the app which is useful in managing everything related to it right there, this might be useful in case the app grows in size and there is a need to pulish,manage and host these separately.

The app structure is as follows:
- actions: The `sweet-state` actions to perform over the store.
- components: The components which are used in the app.
- features: All the pages that exist in the app.
- models: The models used in the app.
- utils: Other utility functions, including the API calls etc.
- stores: The custom store used for redux based functions to be used in the app.

The app also uses different layouts for different scenarios, they can be found under `src/app/layouts`
The common functionalities such are abstracted out in `src/app/common`

### Theming
The `theme.ts` file is used to override the default MUI theme.

### Routing
The routing is handled via `src/routes.tsx`, we use `useRoutes` from `react-router-dom` to handle the routing, with as many children routes as possible, for example:
```ts
{
    path: "/items",
    element: <DashboardLayout />,
    children: [
        { path: "all", element: <ItemsList /> },
        { path: "add", element: <ItemsAdd /> },
        { path: ":id", element: <ItemDetails /> },
    ],
},
```
The above setup uses the `DashboardLayout` and then allows rendering the elements on top of it.

### Menu items
The project uses a `Drawer` on the left page (which is responsive) to render menus, the code is configured to auto-highlight the required menu item based on the current route.
You can easily add more items there by including them in `src/apps/layouts/dashboard/SidebarConfig.tsx`, for example, if you were to add a new menu called `Foo` with two sub items like `Bar` and `Baz`, you would add them in `src/apps/layouts/dashboard/SidebarConfig.tsx` as follows:
```ts
{
    title: "foo",
    path: "/foo",
    children: [
        {
            title: "Bar",
            path: "/foo/bar",
        },
        {
            title: "Baz",
            path: "/foo/baz",
        },
    ],
    icon: getIcon(someIcon),
},
```

### Validations
A couple validations have been built and included for you with a function that lets you pass in the form field name and then validate it easily, we will be adding `react-hook-form` in the future, so you can use it to validate the form fields.
