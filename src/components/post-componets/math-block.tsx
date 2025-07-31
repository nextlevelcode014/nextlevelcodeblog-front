// components/MathBlock.jsx
import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'

const MathBlock = ({ value }: { value: any }) => {
  const { formula, displayMode, label } = value

  if (!formula) {
    return null
  }

  try {
    if (displayMode) {
      return (
        <div className="math-block">
          <BlockMath math={formula} />
          {label && <div className="math-label">({label})</div>}
        </div>
      )
    }

    return <InlineMath math={formula} />
  } catch (error) {
    return (
      <div className="math-error">
        <code>{formula}</code>
        <small>Erro na fórmula LaTeX</small>
      </div>
    )
  }
}

export default MathBlock
