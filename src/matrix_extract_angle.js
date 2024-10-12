/**
 * 🐛️ Does not work for all angles
 *
 * @link https://stackoverflow.com/a/37664392
 */
function matrix_extract_angle(matrix)
{
    return Math.asin(matrix[1]);
}

module.exports = matrix_extract_angle;
