"use client";
import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { startCase, uniq } from "lodash";

import { SubmissionsQueryQuery } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

const Dashboard: React.FC = () => {
    const [generateSubmission] = useMutation(gql`
    mutation GenerateSubmission($count: Int!){
        queueSubmissionGeneration(count: $count)
    }`, { variables: { count: 10 } })

    const { data, error, loading } = useQuery<SubmissionsQueryQuery>(
        gql`
      query submissionsQuery {
        submissions {
          id
          submittedAt
          data
        }
      }
    `,
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { submissions } = data!;

  
    return (
        <>
            <div className='flex justify-end mb-5'>
                <Button onClick={() =>generateSubmission()} className='p-5'>
                    <div className='mr-5'>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    </div>Generate Submissions
                </Button>
            </div>
            <Table>
                <TableCaption>A list of your recent submissions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Id</TableHead>
                        <TableHead>Submitted At</TableHead>
                        {uniq(submissions.map((submission: any) => Object.keys(submission.data)).flat()).map((key: any) => (
                            <TableHead className='text-justify' key={key}>{startCase(key)}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.slice().reverse().map((submission: any) => (
                        <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.id}</TableCell>
                            <TableCell>{submission.submittedAt}</TableCell>
                            {uniq(Object.keys(submission.data)).map((key: any) => (
                                <TableCell className="" key={key}>
                                    {submission.data[key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}


                </TableBody>
            </Table >
        </>
    );
};

export default Dashboard;
