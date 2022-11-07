import styles from '../styles/circularProgress.module.scss';

interface CircularProgressProps {
  percentage: number;
}

export function CircularProgress(props: CircularProgressProps){
    const sqSize = 150;
    const radius = (150 - 8) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * props.percentage / 100;

  return (
    <svg
          width={150}
          height={150}
          viewBox={viewBox}>
          <circle
            className={styles.circle_background}
            cx={150 / 2}
            cy={150 / 2}
            r={radius}
            strokeWidth={`${8}px`} />
          <circle
            className={styles.circle_progress}
            cx={150 / 2}
            cy={150 / 2}
            r={radius}
            strokeWidth={`${8}px`}
            transform={`rotate(-90 ${150 / 2} ${150 / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
          <text
            className={styles.circle_text}
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${props.percentage}%`}
          </text>
      </svg>
  );
}