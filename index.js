var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function useValidate() {
    function validateManySync(inputs) {
        let isValid = onCheckManyRequired(inputs);
        if (!isValid)
            return isValid;
        for (const i in inputs) {
            validateSingleSync(inputs[i], inputs);
            if (inputs[i].errors.length > 0)
                isValid = false;
        }
        return isValid;
    }
    function validateMany(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = onCheckManyRequired(inputs);
            if (!isValid)
                return isValid;
            for (const i in inputs) {
                validateSingleSync(inputs[i], inputs);
            }
            for (const i in inputs) {
                if (inputs[i].errors.length > 0)
                    isValid = false;
            }
            if (!isValid)
                return isValid;
            for (const i in inputs) {
                yield validateSingle(inputs[i], inputs);
                if (inputs[i].errors.length > 0)
                    isValid = false;
            }
            return isValid;
        });
    }
    function validateSingleSync(input, inputs) {
        validateSync(input, inputs);
        crossfieldValidate(input, inputs);
        return input;
    }
    function validateSingle(input, inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            validateSync(input, inputs);
            crossfieldValidate(input, inputs);
            if (input.errors.length > 0)
                return input;
            yield validate(input, inputs);
            return input;
        });
    }
    function validateSync(input, inputs) {
        const { attributes, validationsSync } = input;
        const newErrors = [];
        if (onCheckRequired(input))
            return;
        if (!validationsSync)
            return;
        validationsSync(attributes, inputs && inputs).forEach(({ conditional, message }) => {
            if (conditional)
                newErrors.push(message);
        });
        input.errors = [...newErrors];
    }
    function validate(input, inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { attributes, validations } = input;
            const newErrors = [];
            if (!validations)
                return;
            (yield validations(attributes, inputs && inputs)).forEach(({ conditional, message }) => {
                if (conditional)
                    newErrors.push(message);
            });
            input.errors = [...newErrors];
        });
    }
    function crossfieldValidate(input, inputs) {
        if (!inputs)
            return;
        if (!input.crossfields || input.crossfields.length === 0)
            return;
        input.crossfields.forEach((crossInput) => {
            if (!inputs[crossInput].attributes.value)
                return;
            validateSync(inputs[crossInput], inputs);
        });
    }
    function onCheckRequired(input) {
        const { attributes, required } = input;
        if (!attributes.value && (required === null || required === void 0 ? void 0 : required.value)) {
            if (!required.message) {
                input.errors.push('');
                return true;
            }
            input.errors.push(required.message);
            return true;
        }
        return false;
    }
    function onCheckManyRequired(inputs) {
        let isValid = true;
        for (const i in inputs) {
            onCheckRequired(inputs[i]);
            if (inputs[i].errors.length > 0)
                isValid = false;
        }
        return isValid;
    }
    return {
        validateSingleSync,
        validateSingle,
        validateManySync,
        validateMany,
    };
}
