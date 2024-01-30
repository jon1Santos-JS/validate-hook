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
     validateSingleSync: <T extends string>(input: ValidateInputType<T, T>, inputs?: InputsToValidateType<T>) => ValidateInputType<T, T>;
    
     /** 
      * Validate a single input object asynchronously.
      * @param input Object input with {@linkcode ValidateInputType} properties
      * @param inputs Object with inputs to access them in  {@linkcode ValidateFunctionType} /  {@linkcode AsyncValidateFunctionType}
      * @returns The `input` object itself.
      * */
     validateSingle: <T extends string>(input: ValidateInputType<T, T>, inputs?: InputsToValidateType<T>) => Promise<ValidateInputType<T, T>>;
 
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
    [key in T]: ValidateInputType<T, T>;
};

export interface ValidateInputType<T extends string, U extends T> {
    validations?: AsyncValidateFunctionType<T>;
    validationsSync?: ValidateFunctionType<T>;
    errors: string[];
    requestErrors?: string[];
    crossfields?: U[];
    attributes: InputAttributes;
    required?: { value: boolean; message?: string };
}

export interface InputAttributes {
    value: string;
    files?: FileList | null;
}

type ValidateFunctionType<T extends string> = (
    inputAttributes: InputAttributes,
    inputs?: InputsToValidateType<T>,
) => Validation[];

type AsyncValidateFunctionType<T extends string> = (
    inputAttributes: InputAttributes,
    inputs?: InputsToValidateType<T>,
) => Promise<Validation[]>;

interface Validation {
    conditional: boolean | RegExpMatchArray | null | Promise<boolean | string>;
    message: string;
}

