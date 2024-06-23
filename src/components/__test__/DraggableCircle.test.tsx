import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MapContainer } from 'react-leaflet';
import { DraggableCircle } from '../DraggableCircle';

describe('DraggableCircle', () => {
  it('renders correctly', () => {
    render(
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100vh', width: '100vw' }}>
        <DraggableCircle />
      </MapContainer>
    );

    const circle = screen.getByTestId('draggable-circle'); // data-testid を持つ要素を取得

    // 要素の属性やスタイルなどを検証
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveStyle({
      width: '50px', // 例: 初期サイズが 50px であることを確認
      height: '50px',
      backgroundColor: 'blue', // 例: 初期色が青であることを確認
    });
  });

  it('can be dragged', async () => {
    const user = userEvent.setup(); // userEvent を初期化
    render(<DraggableCircle />);
    const circle = screen.getByTestId('draggable-circle');

    const originalPosition = circle.getBoundingClientRect();
    const dragDelta = { x: 100, y: 50 }; // ドラッグで移動させる量

    // ドラッグ操作をシミュレート (userEvent を使用)
    await user.pointer([
      { keys: '[MouseLeft>]', target: circle }, // マウスボタンを押す
      {
        coords: {
          x: originalPosition.x + dragDelta.x,
          y: originalPosition.y + dragDelta.y,
        },
      }, // 移動
      { keys: '[/MouseLeft>]' }, // マウスボタンを離す
    ]);

    // ドラッグ後の位置を検証
    const newPosition = circle.getBoundingClientRect();
    expect(newPosition.x).toBe(originalPosition.x + dragDelta.x);
    expect(newPosition.y).toBe(originalPosition.y + dragDelta.y);
  });
});
