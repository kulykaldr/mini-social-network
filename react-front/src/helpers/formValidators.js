export const required = value => (value || typeof value === 'number' ? undefined : 'Required field');

export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const validateImageWeight = maxWeight => imageFile => {
    if (imageFile && imageFile.size) {
        // Get image size in kilobytes
        const imageFileKb = imageFile.size / 1024;
        if (imageFileKb > maxWeight) {
            return `Image size must be less or equal to ${maxWeight}kb`;
        }
    }
};

export const validateImageFormat = imageFormat => imageFile => {
    if (imageFile && (imageFile.type || imageFile.contentType)) {
        if (!imageFormat.includes(imageFile.type || imageFile.contentType)) {
            return `Image mime type must be ${imageFormat}`;
        }
    }
};

export const validateImageWidth = maxWidth => imageFile => {
    if (imageFile && imageFile.width) {
        if (imageFile.width > maxWidth) {
            return `Image width must be less or equal to ${maxWidth}px`;
        }
    }
};
export const validateImageHeight = maxHeight => imageFile => {
    if (imageFile && imageFile.height) {
        if (imageFile.height > maxHeight) {
            return `Image height must be less or equal to ${maxHeight}px`;
        }
    }
};