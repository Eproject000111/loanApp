
function validate(data, rules, options = {}){
    if(!data){
        return { valid: false, errors:'Parameter Missing!', data: null};
    }
    const errors = {};
    const validated = {};
    const defaults = options.defaultValues || {};

    for (const field in rules) {
      let value = data[field];

      // Apply default value
      if ((value === undefined || value === null) && defaults[field] !== undefined) {
        value = defaults[field];
      }

      for (const rule of rules[field]) {

        // required
        if (rule === 'required' && (value === undefined || value === null || value === '')) {
          errors[field] = `${field} is required`;
          break;
        }

        // string
        if (rule === 'string' && value !== undefined && typeof value !== 'string') {
          errors[field] = `${field} must be a string`;
          break;
        }

        // numeric
        if (rule === 'numeric' && value !== undefined && isNaN(value)) {
          errors[field] = `${field} must be numeric`;
          break;
        }

        // digits:11
        if (rule.startsWith('digits:') && value !== undefined) {
          const digits = parseInt(rule.split(':')[1]);
          if (!/^\d+$/.test(value) || value.toString().length !== digits) {
            errors[field] = `${field} must be exactly ${digits} digits`;
            break;
          }
        }

        // max:11 (optional alternative)
        if (rule.startsWith('max:') && value !== undefined) {
          const max = parseInt(rule.split(':')[1]);
          if (value.toString().length > max) {
            errors[field] = `${field} must not exceed ${max} characters`;
            break;
          }
        }

        // email
        if (rule === 'email' && value !== undefined) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field] = `${field} must be a valid email address`;
            break;
          }
        }

       /*  if (rule.startsWith('in:')) {
          const allowed = rule.split(':')[1].split(',');
          if (value && !allowed.includes(value)) {
            errors[field] = `${field} must be in ${allowed.join(',')}`;
          }
        } */
      }

      validated[field] = value;
    }

    if (Object.keys(errors).length) {

      return { valid: false, errors, data: null };
    }

    return { valid: true, errors: null ,data: validated };
}

module.exports = {
    validate
}