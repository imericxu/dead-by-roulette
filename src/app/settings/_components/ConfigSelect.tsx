"use client";

import StyledButton, { buttonStyles } from "@/components/StyledButton";
import { selectConfig, type Config } from "@/lib/config";
import { LucideChevronDown, LucideSettings2 } from "lucide-react";
import { type ReactElement } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface ConfigSelectProps {
  className?: string;
  configs: Config[] | undefined;
}

export default function ConfigSelect({
  className,
  configs,
}: ConfigSelectProps): ReactElement {
  return (
    <>
      <div className={twMerge("flex w-full gap-2", className)}>
        {configs !== undefined ? (
          <div className="flex-grow">
            <Select
              autoComplete="on"
              selectedKey={configs[0].id}
              onSelectionChange={async (selected) => {
                if (typeof selected !== "number")
                  throw new Error("Invalid key.");
                await selectConfig(selected);
              }}
              className="flex items-baseline gap-2"
            >
              <Label>Config</Label>
              <StyledButton
                size="lessPadding"
                case="normal"
                className="flex-grow"
              >
                <SelectValue className="grow overflow-ellipsis whitespace-nowrap text-left" />
                <LucideChevronDown size={16} />
              </StyledButton>
              <Popover className="flex min-w-[--trigger-width] flex-col gap-2 bg-gradient-to-b from-black/90 from-50% via-black/80 via-90% to-black/25 p-2">
                <ListBox items={configs}>
                  {(item) => (
                    <ListBoxItem
                      key={item.id}
                      className={twMerge(
                        buttonStyles({
                          size: "lessPadding",
                          case: "normal",
                        }),
                        "w-full justify-start focus:border-main focus:bg-overlay",
                      )}
                    >
                      {item.name}
                    </ListBoxItem>
                  )}
                </ListBox>
              </Popover>
            </Select>
          </div>
        ) : (
          <div
            className={twMerge(
              "flex flex-grow items-baseline gap-2 [&>*]:cursor-wait",
              className,
            )}
          >
            <span>Config</span>
            <Button
              isDisabled
              className="inline-flex h-10 grow items-center gap-2 border border-main-light px-2 text-white/75"
            >
              <span className="grow overflow-ellipsis whitespace-nowrap text-left">
                Loading&hellip;
              </span>
              <LucideChevronDown size={16} />
            </Button>
          </div>
        )}

        {/* Manage Configs */}
        <StyledButton isDisabled={configs === undefined} size="icon">
          <LucideSettings2 size={20} />
        </StyledButton>
      </div>
    </>
  );
}
