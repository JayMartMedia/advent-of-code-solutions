use std::fs::{read_to_string};

fn main() {
    let input: String = read_to_string("src/einput.txt").unwrap();
    let groups: Vec<&str> = input.split("\r\n\r\n").collect();
    println!("Hello, world!");
    // println!("{:?}", groups);
    groups.iter().for_each(|line | println!("{line}"));

    let groupSums = groups.iter().map(
        |group| group.split("\r\n").reduce(|a,b| &[a,b].join(" "))
    );
    //groupSums.iter().for_each(|sum|println!("{}",sum));
    println!("{:?}", groupSums);
}
