'use client'

import { teamMemberType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { Table } from "flowbite-react";
import { uniqueId } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function DashboardTeamData() {
    const [teamMembers, setTeamMembers] = useState<teamMemberType>();
    useEffect(() => {
        const teamCompleate = async () => {
            try {
                const response = await axios.get('/api/v1/check-team-compleate')
                !response.data.teamDataCompleate ? window.location.href = '/dashboard/team/compleate' : ''
            } catch (error) {
                console.log(error);
            }
        }
        teamCompleate();
        const dataTeam = async () => {
            const teamMember = await axios.get("/api/v1/team-member", { withCredentials: true })
            setTeamMembers(teamMember.data.data)
        }
        dataTeam()
    }, []);


    return (
        <>
            <div className="bg-white p-5 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-3">Informasi Dosen</h3>
                <div className="flex flex-co sm:flex-row sm:items-center gap-4">
                    <p className="text-gray-700">Nama Dosen: <span className="font-semibold">{teamMembers?.lectureName}</span></p>
                    <p className="text-gray-700">NIDN/NIP Dosen: <span className="font-semibold">{teamMembers?.lectureNip}</span></p>
                </div>
            </div>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
                <div className="px-6 mb-3 divide-y divide-border dark:divide-darkborder">
                    <h3 className="card-title">Anggota Team</h3>
                </div>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>NIM</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>No WA</Table.HeadCell>
                            <Table.HeadCell>Program Studi</Table.HeadCell>
                            <Table.HeadCell>KTM</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                            {teamMembers?.teamMembers.map((member) => (
                                <Table.Row key={uniqueId()} >
                                    <Table.Cell>
                                        <p className="text-base text-wrap">{member.name}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className="text-base text-wrap">{member.nim}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className="text-base text-wrap">{member.email}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className="text-base text-wrap">{member.noWa}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className="text-base text-wrap">{member.prodi}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link href={member.fileKTM} target="_blank">
                                            <Icon
                                                icon="solar:link-broken"
                                                className="font-bold block mx-auto text-blue-500 leading-6 dark:text-opacity-60 hide-icon"
                                                height={24}
                                            />
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}