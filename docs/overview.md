---
id: overview
title: Overview
---

At the dawn of time, React came along with it no Form Helpers at all. Then, [Formik](https://github.com/jaredpalmer/formik) came along, and the people rejoiced. Formik is a work of art for plain JavaScript, and I've been very happy with it. However, with TypeScript and Formik, almost every Type is a lie, and some of the conveniences that normally come with TypeScript were left out. Most things are `any` to begin with. Those things that were typed had no validation upstream. Here's an example:

<summary>View the accepted Formik way of building forms.</summary>
<details>

```jsx
export interface IAgeFormValues {
    age?: number;
}
export const MyComponent = (
    <Formik<IAgeFormValues> initialValues={{}}>
        {formik => (
            <Form>
                // the instant you enter a 2 into here, formik.form.values.age is "2", even though IAgeFormValues defines it as a number
                <Field name="age" type="number" value={formik.field.value} />

                // this typo will go uncaught until your client has lost hundreds if not all of their national treasures
                <Field name="nicholascage" type="number" value={formik.field.value} />
            </Form>
        )}
    </Formik>
);
```

</details>

This is my ([@johnrom](https://twitter.com/_johnrom)) attempt to wrap Formik in majestic and true typings, so you can have full confidence in your forms.

## Installation

You can install Formik-Typed with [NPM](https://npmjs.com),
[Yarn](https://yarnpkg.com), or a good ol' `<script>` via
[unpkg.com](https://unpkg.com).

### NPM

```sh
npm install formik-typed --save
```
or
```
yarn add formik-typed
```

Formik-Typed shares compatibility with [Formik](https://jaredpalmer.com/formik/docs/overview#installation). Of course, for TypeScript usage, you can't just plug it in and go. You'll want to incorporate it with your TypeScript project. If you're not using TypeScript, you should probably _just use Formik_. Change my mind!
