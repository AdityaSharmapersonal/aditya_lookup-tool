# Lightweight Baseline Comparison

## Baseline

The baseline is a simpler prompt-only explanation approach.

Baseline prompt:

"Explain this country using the provided data."

## Final System

The final system uses a more controlled prompt that tells the model to:

- use only the provided JSON
- avoid unsupported claims
- return structured output
- use exact country names
- omit facts that are not supported

## Comparison

| Feature | Baseline | Final System |
|---|---|---|
| Uses country data | Yes | Yes |
| Controls unsupported claims | Weak | Stronger |
| Structured output | No | Yes |
| Easier to validate | No | Yes |
| Better for debugging | No | Yes |
| Safer explanation | Weak | Stronger |

## Result

The final system is better because it reduces unsupported claims and makes the output easier to validate. This matters because the app should explain countries using stored data, not outside assumptions.