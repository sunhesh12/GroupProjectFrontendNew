import { style } from 'motion/react-client'
import React from 'react'
import styles from './page.module.css'

export default function page() {
  return (
    <div>
      <div className={styles.QuestionContainer}>
        <div className={styles.oneQuestionContainer}>
          <div className={styles.flagQuestion}></div>
          <div className={styles.oneQuestionWrapper}>
            <p>Question Topic</p>
            <div className={styles.optionsContainer}>
              <div className={styles.optionBox}><input type='radio' /> Option 1</div>
              <div className={styles.optionBox}><input type='radio' /> Option 2</div>
              <div className={styles.optionBox}><input type='radio' /> Option 3</div>
              <div className={styles.optionBox}><input type='radio' /> Option 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
