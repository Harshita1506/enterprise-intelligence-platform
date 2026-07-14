"""
Enterprise Agent Evaluator.

Runs the Enterprise AI Agent against a fixed evaluation dataset
and measures routing correctness and orchestration behaviour.
"""
import csv
from pathlib import Path
import time
from typing import List
from src.week5_agent_workflow.state import AgentState
from src.week5_agent_workflow.graph import enterprise_agent_app

from src.week5_evaluation.metrics import EvaluationMetrics
from src.week5_evaluation.evaluation_dataset import (
    EvaluationCase,
    EVALUATION_DATASET,
)

from src.week5_agent_workflow.execution_strategy import (
    ExecutionStrategy,
    ExecutionMode,
)


class EnterpriseEvaluator:
    """
    Executes the evaluation benchmark.

    Responsibilities
    ----------------
    • Run the LangGraph agent
    • Compare outputs with expected behaviour
    • Measure latency
    • Aggregate metrics
    """

    def __init__(self):
        self.strategy = ExecutionStrategy()

    # ----------------------------------------------------------

    def evaluate_case(
        self,
        case: EvaluationCase
    ) -> EvaluationMetrics:
        """
        Evaluate one benchmark query.
        """

        start = time.perf_counter()

        final_state = enterprise_agent_app.invoke(
            {
                "query": case.query
            }
        )
        print(type(final_state))
        print(final_state)

        latency = time.perf_counter() - start

        # ----------------------------------------
        # Routing Accuracy
        # ----------------------------------------

        routing_correct = False

        decision = final_state.get("decision")

        if decision is not None:
            routing_correct = (
                decision.selected_tool
                == case.expected_tool
            )

        # ----------------------------------------
        # Planner Accuracy
        # ----------------------------------------

        state = AgentState(**final_state)
        actual_mode = final_state["execution_mode"]

        expected_mode = (
            ExecutionMode.MULTI_STEP
            if case.requires_multi_step
            else ExecutionMode.SINGLE_TOOL
        )

        planner_correct = actual_mode == expected_mode

        # ----------------------------------------
        # Graph Execution
        # ----------------------------------------

        graph_success = (
            final_state.get("final_response") is not None
        )

        return EvaluationMetrics(
            query=case.query,
            routing_correct=routing_correct,
            planner_correct=planner_correct,
            latency_seconds=round(latency, 3),
            graph_success=graph_success,
        )

    # ----------------------------------------------------------

    def evaluate_all(self) -> List[EvaluationMetrics]:
        """
        Runs every benchmark case.
        """

        results = []

        for case in EVALUATION_DATASET:
            results.append(
                self.evaluate_case(case)
            )

        return results

    # ----------------------------------------------------------

    @staticmethod
    def print_summary(results: List[EvaluationMetrics]) -> None:
        """
        Prints an evaluation report.
        """

        total = len(results)

        routing_score = sum(
            r.routing_correct
            for r in results
        )

        planner_score = sum(
            r.planner_correct
            for r in results
        )

        graph_score = sum(
            r.graph_success
            for r in results
        )

        avg_latency = (
            sum(r.latency_seconds for r in results)
            / total
        )

        print("\n" + "=" * 70)
        print("ENTERPRISE AI AGENT EVALUATION")
        print("=" * 70)

        print(f"Total Queries        : {total}")
        print(
            f"Routing Accuracy     : {routing_score}/{total}"
        )
        print(
            f"Planner Accuracy     : {planner_score}/{total}"
        )
        print(
            f"Successful Runs      : {graph_score}/{total}"
        )
        print(
            f"Average Latency      : {avg_latency:.2f} sec"
        )

        print("=" * 70)

        print("\nDetailed Results\n")

        for result in results:

            print("-" * 60)

            print(result.query)

            print(
                f"Routing  : {'PASS' if result.routing_correct else 'FAIL'}"
            )

            print(
                f"Planner  : {'PASS' if result.planner_correct else 'FAIL'}"
            )

            print(
                f"Execution : {'PASS' if result.graph_success else 'FAIL'}"
            )

            print(
                f"Latency : {result.latency_seconds:.2f}s"
            )

        print("-" * 60)
    def export_results(
    self,
    results: list[EvaluationMetrics],
    output_file: str = "evaluation_report.csv",
):
        output_path = Path(output_file)

        with output_path.open(
            "w",
            newline="",
            encoding="utf-8"
        ) as csvfile:

            writer = csv.writer(csvfile)

            writer.writerow([
                "Query",
                "Routing Correct",
                "Planner Correct",
                "Graph Success",
                "Latency (sec)"
            ])

            for r in results:

                writer.writerow([
                    r.query,
                    r.routing_correct,
                    r.planner_correct,
                    r.graph_success,
                    r.latency_seconds
                ])

        print(f"\nEvaluation report saved to: {output_path.resolve()}")    