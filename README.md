> Note: Does not work in IE11 or anywhere Proxy is not supported! I'm not actively maintaining this project as I need IE11 support at the moment.

> This is based on Formik v1, so there are no examples with hooks.

A proof of concept. Making forms less verbose in [React](https://github.com/facebook/react) shouldn't cause you to lose your [TypeScript](https://typescriptlang.org) typings. This package provides a wrapper for [Formik](https://github.com/jaredpalmer/formik/) that will strongly type your field and auto-populate its name based on your Formik `FormValues` shape.

Status: **pre-Alpha**

Before use, check out the [Formik Docs](https://jaredpalmer.com/formik/docs/overview).

## In-browser Playgrounds

[CodeSandbox](https://codesandbox.io/s/formik-typed-fzge9)

## Examples

See all examples here: https://github.com/johnrom/formik-typed/tree/master/examples

Or check out the [CodeSandbox](https://codesandbox.io/s/formik-typed-fzge9).

### Using Fields

```tsx
export interface SignupFormValues {
  title: string;
  name: string;
  age?: number;
  emergencyContacts: EmergencyContact[];
}

export const SignupForm: React.FC<
  TypedFormikProps<SignupFormValues>
> = props => {
  const TitleField = props.fields.title._getField();
  const NameField = props.fields.name._getField();

  return (
    <div>
      <h1>Signup</h1>
      <Form>
        <p>
          {/* Writing a Field definition inline is dead simple.  */}
          <TitleField>
            {titleProps => (
              <>
                <label htmlFor={titleProps.field.name}>Title</label>
                <select
                  name={titleProps.field.name}
                  value={titleProps.field.value}
                  onChange={titleProps.field.onChange}
                >
                  <option value="">Select a Title (optional)</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </>
            )}
          </TitleField>
        </p>
        <p>
          <NameField>
            {nameProps => (
              <>
                <label htmlFor={nameProps.field.name}>Name</label>
                <input
                  name={nameProps.field.name}
                  value={nameProps.field.value}
                  onChange={nameProps.field.onChange}
                  placeholder="John"
                />
              </>
            )}
          </NameField>
        </p>
        {/* Passing your own Custom Component to a Field definition is also pretty easy.
         */}
        <AgeField field={props.fields.age._getField()} min={21} />
        {/* For Custom Components that need to manage multiple fields, you can pass the proxy directly */}
        <EmergencyContactsField fields={props.fields} />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
```

---

Shoutout to Jared Palmer for his work on Formik.

---

MIT License.

---
