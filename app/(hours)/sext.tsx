import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Sext extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Sext";
      this.title2 = "Noonday Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "terce";
      this.next = "nones";
  }
}


export default function Service() {
    const service: Hour = new Sext(new Date());
  return <HourService hour={service} />
}
