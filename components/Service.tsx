import { StyleSheet } from 'react-native';
import { Text, TextProps, View } from '@/components/Themed';
import { Href, Link, LinkComponent } from 'expo-router';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { InLent, InAdvent, In12DaysOfXmas, InEpiphany, ThroughBaptism, IsTransfiguration, UntilAscension, UntilPentecost, AfterPentecost } from '@/components/Calendar';

export function randstr(prefix: string) {
    return Math.random().toString(36).replace('0.',prefix + '_' || '');
}

export class Hour {
    date: Date = new Date();
    title?: string;
    title2?: string;
    text?: JSX.Element;
    prev?: string;
    next?: string;
    prevLink?: LinkComponent;
    nextLink?: LinkComponent;
    

    constructor(date: Date) {
        // Advent
        //this.date = new Date('2024-12-02');
        // Lent
        //this.date = new Date('2024-03-10');
        this.date = date;
    }

    inLent() {
        return InLent(this.date);
    }

    inAdvent() {
        return InAdvent(this.date);
    }

    in12Days() {
        return In12DaysOfXmas(this.date);
    }

    inEpiphany() {
        return InEpiphany(this.date);
    }

    throughBaptism() {
        return ThroughBaptism(this.date);
    }

    isTransfiguration() {
        return IsTransfiguration(this.date);
    }

    isBeforeAscension() {
        return UntilAscension(this.date);
    }

    isBeforePentecost() {
        return UntilPentecost(this.date);
    }

    isAfterPentecost() {
        return AfterPentecost(this.date);
    }

    private _makeLink(hourName: string | undefined, isPrev: boolean) {
        const hrn: string = `${hourName}`.toLowerCase();
        const hrnFixed: string = hrn.charAt(0).toUpperCase() + hrn.slice(1)
        return (
            <Link href={("/(hours)/" + hrn) as Href<string>} replace asChild>
                <Pressable>
                    <Text style={styles.title}>{isPrev && '<'} {hrnFixed} {!isPrev && '>'}</Text>
                </Pressable>
            </Link>
        )
    }

    makeNext() {
        if (this.next === undefined) return null;
        return this._makeLink(this.next, false);
    }

    makePrev() {
        if (this.prev === undefined) return null;
        return this._makeLink(this.prev, true);
    }
}

interface HourServiceProps {
    hour: Hour;
}



export default function HourService(props: HourServiceProps): JSX.Element {
    const privLink: any = props.hour.makePrev();
    const nextLink: any = props.hour.makeNext();
    return (
        <View style={styles.container}>
        <View style={styles.body}>
            <Text style={styles.title}>{props.hour.title}</Text>
        </View>
        <View style={styles.body}>
            {props.hour.text}
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.footer}>
            <View >{privLink !== null && privLink}</View>
            <View></View>
            <View >
                {nextLink !== null && nextLink}
            </View>
        </View>
        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    body: {
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'normal',
        paddingTop: 20
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '100%',
    },
    footer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    textHeader: {
        flex: .035
    },
    text: {
        flex: 1, 
        fontStyle: 'normal', 
        fontWeight: 'normal'
    }
});

const Tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

export function Section(props: PropsWithChildren) {
    return (
        <View style={{paddingTop: 20}}>{props.children}</View>
    )
}
export function SectionTitle(props: TextProps): JSX.Element {
    return (
        <Text style={{fontVariant: ['small-caps'], paddingBottom: 5, fontSize: 16}}>{props.children}</Text>
    )
}
export function LText(props:TextProps) {
    return (
        <View style={styles.textContainer}>
        <Text style={styles.textHeader}>L:</Text><Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

export function CText(props:TextProps) {
    return (
        <View style={styles.textContainer}>
        <Text style={styles.textHeader}>C:</Text><Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

export function AText(props:TextProps) {
    return (
        <View style={styles.textContainer}>
        <Text style={styles.textHeader}>A:</Text><Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

export function NText(props:TextProps) {
    return (
        <View style={styles.textContainer}>
        <Text style={styles.textHeader}></Text><Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

export function GloryBe() {
    return (
    <Section>
        <SectionTitle>Gloria Patri</SectionTitle>
        <AText>Glory be to the Father, and to the Son, and to the Holy Spirit; as it was in the beginning, is now and will be forever. Amen</AText>
    </Section>
    )
}

export function Venite() {
    return (
        <Section>
            <SectionTitle>Venite</SectionTitle>
            <AText>
            Oh come, let us sing to the Lord;
            let us make a joyful noise to the rock of our salvation!
            Let us come into his presence with thanksgiving;
            let us make a joyful noise to him with songs of praise!
            For the Lord is a great God,
            and a great King above all gods.
            In his hand are the depths of the earth;
            the heights of the mountains are his also.
            The sea is his, for he made it,
            and his hands formed the dry land.
            </AText>
            <NText>
            Oh come, let us worship and bow down;
            let us kneel before the Lord, our Maker!
            For he is our God,
            and we are the people of his pasture,
            and the sheep of his hand.
            Today, if you hear his voice,
            do not harden your hearts, as at Meribah,
            as on the day at Massah in the wilderness,
            when your fathers put me to the test
            and put me to the proof, though they had seen my work.
            For forty years I loathed that generation
            and said, “They are a people who go astray in their heart,
            and they have not known my ways.”
            Therefore I swore in my wrath,
            “They shall not enter my rest.”
            </NText>
        </Section>
    )
}