
import { Chapter, ProduceCalendar } from '@/components/BiblePlan';
import { CText, GloryBe, Hour, LText, NText, OurFatherText, Oremus, Section, SectionTitle, TextSpacer, randstr, Psalmody, Confiteor, OurFather, Lectio } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';
import { psalms2readings } from '@/constants/BibleInfo';

export class Compline extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Prayer at the Close of the Day";
      this.prev = "vespers";

      const titles = [
        'Jeremiah 14:7-9',
        'Matthew 11:28-30',
        'John 14:27',
        'Romans 8:38-39',
        'I Peter 5:6-9',
        'Jude 17-21',
        '2 Timothy 2:10-13'
      ]

      const lessons = [
        'Though our iniquities testify against us, act, O Lord, ' +
        'for your name\'s sake; for our backslidings are many; we have sinned against you. ' +
        'O you hope of Israel, its savior in time of trouble, why should you be like a stranger in the land,' +
        'like a traveler who turns aside to tarry for a night? ' + 
        'Why should you be like a man confused, like a mighty warrior who cannot save? '+
        'Yet you, O Lord, are in the midst of us, and we are called by your name;' +
        'do not leave us.',

        'Come to me, all who labor and are heavy laden, and I will give you rest. ' +
        'Take my yoke upon you, and learn from me, for I am gentle and lowly in heart, ' +
        'and you will find rest for your souls. For my yoke is easy, and my burden is light.',

        'Peace I leave with you; my peace I give to you. ' + 
        'Not as the world gives do I give to you. ' + 
        'Let not your hearts be troubled, neither let them be afraid.',

        'For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, ' + 
        'nor powers, nor height nor depth, nor anything else in all creation, ' +
        'will be able to separate us from the love of God in Christ Jesus our Lord.',

        'Humble yourselves, therefore, under the mighty hand of God so that at the proper time he may exalt you, ' + 
        'casting all your anxieties on him, because he cares for you. ' + 
        'Be sober-minded; be watchful. Your adversary the devil prowls around like a roaring lion, ' +
        'seeking someone to devour. Resist him, firm in your faith, ' + 
        'knowing that the same kinds of suffering are being experienced by your brotherhood throughout the world.',

        'But you must remember, beloved, the predictions of the apostles of our Lord Jesus Christ. ' +
        'They said to you, “In the last time there will be scoffers, following their own ungodly passions.” ' +
        'It is these who cause divisions, worldly people, devoid of the Spirit. ' + 
        'But you, beloved, building yourselves up in your most holy faith and praying in the Holy Spirit, ' + 
        'keep yourselves in the love of God, waiting for the mercy of our Lord Jesus Christ that leads to eternal life.',

        'Therefore I endure everything for the sake of the elect, that they also may obtain the salvation that is in Christ Jesus with eternal glory. ' +
        'The saying is trustworthy, for: If we have died with him, we will also live with him; if we endure, we will also reign with him; ' +
        'if we deny him, he also will deny us; if we are faithless, he remains faithful—for he cannot deny himself.'
      ]

      const prayers = [
        'Be present, merciful God, and protect us through the hours of this night, ' +
        'so that we who are wearied by the changes and chances of life may find our rest in you; ' +
        'through Jesus Christ our Lord.',

        'O Lord, support us all the day long in this troubled life, ' +
        'until the shadows lengthen and the evening comes and the busy world is hushed, ' +
        'the fever of life is over, and our work is done. Then, Lord, in your mercy, ' +
        'grant us a safe lodging, and a holy rest, and peace at the last; ' +
        'through Jesus Christ our Lord.',

        'Be our light in the darkness, O Lord, and in your great mercy defend us ' +
        'from all perils and dangers of this night; ' +
        'for the love of your only Son, our Savior Jesus Christ.',

        'Visit our dwellings, O Lord, and drive from them all the snares of the enemy; ' +
        'let your holy angels dwell with us to preserve us in peace; ' +
        'and let your blessing be upon us always, through Jesus Christ our Lord.',

        'Eternal God, the hours both of day and night are yours, ' +
        'and to you the darkness is no threat. Be present, we pray, ' +
        'with those who labor in these hours of night, especially those who ' +
        'watch and work on behalf of others. Grant them diligence in their watching, ' +
        'faithfulness in their service, courage in danger, and competence in emergencies. ' +
        'Help them to meet the needs of others with confidence and compassion; ' +
        'through Jesus Christ our Lord.',

        'Gracious Lord, we give you thanks for the day, especially for the good we were ' +
        'permitted to give and to receive; the day is now past and we commit it to you. ' +
        'We entrust you to the night; we rest in surety, for you are our help, ' +
        'and you neither slumber nor sleep.',

        'Come, O Spirit of God, and make within us your dwelling place and home. ' +
        'May our darkness be dispelled by your light, and our troubles calmed by your peace; ' +
        'may all evil be redeemed by your love, all pain transformed through the suffering of Christ, ' +
        'and all dying glorified in his risen life.'
      ]
      const isEarly = this.date.getHours() < 12;
      // Early morning hours should count for the previous day. We don't do this for other services
      // because they're dawn based. This one could easily be after midnight though.
      let d: number;
      if (isEarly) {
        const day = this.date.getDay();
        if (day === 0)  {
          d = 6;
        } else {
          d = day - 1;
        }
      } else {
        d = this.date.getDay();
      }
      const lessonText = lessons[d];
      const title = titles[d];
      const titleParts = titles[d].split(' ');
      const bookname=titleParts[0]
      const chapter=titleParts[1].split(':')[0]
      // these aren't used here so we can just 0 them out
      const numVerses = 0
      const numWords = 0
      const lesson = new Chapter(bookname, chapter, numVerses, numWords)
      lesson.text = [lessonText]
      const prayer = prayers[d];

      const psalmReading = ProduceCalendar(this.DaysInMonth() * 4, psalms2readings)[this.date.getDate() * 4 - 1];

      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Invitatory</SectionTitle>
            <LText>The Lord almighty grant us a quiet night and peace at the last.</LText>
            <CText>Amen.</CText>
            <TextSpacer />
            <LText>It is good to give thanks to the Lord,</LText>
            <CText>To sing praise to your name, O Most High;</CText>
            <LText>to herald your love in the morning,</LText>
            <CText>your truth at the close of the day.</CText>
          </Section>
          <Confiteor day={this.dayOfWeek}/>
          <Section>
            <SectionTitle>Introit</SectionTitle>
            <LText>How precious is your mercy, O God!</LText>
            <CText>The children of men seek shelter in the shadow of your wings.</CText>
            <Psalmody psalmReading={psalmReading}/>
            <LText>How precious is your mercy, O God!</LText>
            <CText>The children of men seek shelter in the shadow of your wings.</CText>
        </Section>
          <GloryBe inLent={this.inLent()} />
          <Lectio verse={title} text={[lesson]}/>
          <Oremus>Cast your worries and cares before the Lord, pray for patience and peace while you wait.</Oremus>
          <Section>
            <SectionTitle>Preces</SectionTitle>
            <LText>Hear my prayer, O Lord;</LText>
            <CText>listen to my cry.</CText>
            <TextSpacer />
            <LText>Keep me as the apple of your eye;</LText>
            <CText>hide me in the shadow of your wings.</CText>
            <TextSpacer />
            <LText>In righteousness I shall see you;</LText>
            <CText>when I awake, your presence will give me joy.</CText>
            <TextSpacer />
            <LText>{prayer}</LText>
            <CText>Amen.</CText>
          </Section>
          <Section>
            <SectionTitle>Nunc Dimittis</SectionTitle>
            <LText>
              Guide us waking, O Lord, and guard us sleeping;
              that awake we may watch with Christ and asleep
              we may rest in peace.
            </LText>
          </Section>
          <Section>
            <CText>
              Lord, now you are letting your servant depart in peace, according to your word; 
              for my eyes have seen your salvation that you have prepared in the presence of all peoples, 
              a light for revelation to the Gentiles, and for glory to your people Israel. 
            </CText>
          </Section>
          <Section>
            <LText>
              Guide us waking, O Lord, and guard us sleeping;
              that awake we may watch with Christ and asleep
              we may rest in peace.
            </LText>
          </Section>
          <OurFather />
          <Section>
            <SectionTitle>Benediction</SectionTitle>
            <LText>The almighty and merciful Lord, the Father, the Son, and the Holy Spirit, bless us and keep us.</LText>
            <CText>Amen.</CText>
          </Section>
        </View>
      )
  }
}

export default function Service() {
    const service: Hour = new Compline(new Date());
  return <HourService hour={service} />
}