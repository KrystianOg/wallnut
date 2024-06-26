export class Point2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isPoint2D(value: any): value is Point2D {
    if (typeof value?.x === "number" && typeof value?.y === "number") {
      return true;
    }

    return false;
  }
}

export class Vector2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number);
  constructor(from: Point2D, to: Point2D);
  constructor(p1: unknown, p2: unknown) {
    if (typeof p1 === "number" && typeof p2 === "number") {
      this.x = p1;
      this.y = p2;
    } else if (Point2D.isPoint2D(p1) && Point2D.isPoint2D(p2)) {
      this.x = p2.x - p1.x;
      this.y = p2.y - p1.y;
    } else {
      throw Error(`Constructor not specified for: ${p1} and ${p2}`);
    }
  }
}

export class Rectangle {
  public point: Point2D;
  public height: number;
  public width: number;

  constructor(point: Point2D, width: number, height: number) {
    this.point = point;
    this.width = width;
    this.height = height;
  }
}
