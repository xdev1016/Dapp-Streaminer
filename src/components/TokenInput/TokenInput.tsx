import React from 'react'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'
import Button from '../Button'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({ onChange, onSelectMax, value }) => {
  const TranslateString = useI18n()
  return (
    <div>
      <Input
        endAdornment={
          <div className="flex items-center">
            <div>
              <Button size="sm" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </Button>
            </div>
          </div>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </div>
  )
}

export default TokenInput
