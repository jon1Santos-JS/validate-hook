export as namespace ValidateHook;
/** 
 * Returns functions to validate objectfied inputs.
 * @version 0.3.0 
 * @see https://www.npmjs.com/package/validate-hook
 * */
export function useValidate(): ValidateFunctions;

declare class ValidateFunctions {
     /** 
     * Validate a single input object.
     * @param input Object input with {@linkcode ValidateInputType} properties.
     * @param inputs Object with inputs to access them in  {@linkcode ValidateFunctionType} /  {@linkcode AsyncValidateFunctionType}.
     * @returns The `input` object itself.
     * */
     validateSingleSync: <T extends string>(input: ValidateInputType<T>, inputs?: InputsToValidateType<T>) => ValidateInputType<T>;
    
     /** 
      * Validate a single input object asynchronously.
      * @param input Object input with {@linkcode ValidateInputType} properties
      * @param inputs Object with inputs to access them in  {@linkcode ValidateFunctionType} /  {@linkcode AsyncValidateFunctionType}
      * @returns The `input` object itself.
      * */
     validateSingle: <T extends string>(input: ValidateInputType<T>, inputs?: InputsToValidateType<T>) => Promise<ValidateInputType<T>>;
 
     /** 
      * Validate 2 or more inputs.
      * @param inputs Object with 2 or more {@linkcode ValidateInputType} to validate  
      * @returns `true` if input error arrays are empty, `false` otherwise.
      * */
     validateManySync: <T extends string>(inputs: InputsToValidateType<T>) => boolean;
 
     /** 
      * Validate 2 or more inputs asynchronously.
      * @param inputs Object with 2 or more {@linkcode ValidateInputType} to validate  
      * @returns `true` if input error arrays are empty, `false` otherwise.
      * */
     validateMany: <T extends string>(inputs: InputsToValidateType<T>) => Promise<boolean>;
}
export type InputsToValidateType<T extends string> = {
    [key in T]: ValidateInputType<T>;
};

export interface ValidateInputType<T extends string> {
    // Use to create validate conditionals and messages
    validations?: AsyncValidateFunctionType<T>;
    // Use to create validate conditionals and messages
    validationsSync?: ValidateFunctionType<T>;
    // Used by hook to return error messages
    errors: string[];
    // An option to keep request errors (when submit the form)
    requestErrors?: string[];
    // Required if you want to validate 2 or more fields at the same time (e.g password/confirm password)
    crossfields?: T[];
    // Attributes to validate throught the validation functions (you can add more of them)
    attributes: InputAttributes;
    // Use when you have an empty input, and don't want to write validation
    required?: { value: boolean; message?: string };
}

// Add more attributes if you want
export interface InputAttributes {
    value: string;
    files?: FileList | null;
}

type ValidateFunctionType<T extends string> = (
    // Attributes to handle inside the validations
    inputAttributes: InputAttributes,
    // Inputs to handle inside the validations (e.g password/confirm password)
    inputs?: InputsToValidateType<T>,
) => Validation[];

type AsyncValidateFunctionType<T extends string> = (
    // Attributes to handle inside the validations
    inputAttributes: InputAttributes,
    // Inputs to handle inside the validations (e.g password/confirm password)
    inputs?: InputsToValidateType<T>,
) => Promise<Validation[]>;

interface Validation {
    // Use to create a conditional to validate the input
    conditional: boolean | RegExpMatchArray | null | Promise<boolean | string>;
    // Use to create a message to validate the input
    message: string;
}

