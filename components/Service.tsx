import { StyleSheet } from 'react-native';
import { Text, TextProps, View } from '@/components/Themed';
import { Href, Link, LinkComponent } from 'expo-router';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { InLent, InAdvent, In12DaysOfXmas, InEpiphany, ThroughBaptism, IsTransfiguration } from '@/components/Calendar';

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
    }
});

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
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>L:    </Text><Text style={{fontStyle: 'normal', fontWeight: 'normal'}}>{props.children}</Text>
        </View>
    )
}

export function CText(props:TextProps) {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>C:    </Text><Text style={{fontStyle: 'normal', fontWeight: 'normal'}}>{props.children}</Text>
        </View>
    )
}

export function AText(props:TextProps) {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>A:    </Text><Text style={{fontStyle: 'normal', fontWeight: 'normal'}}>{props.children}</Text>
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
